import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { WINDOW, windowFactory } from './window';

@Injectable()
export class ScrollService {
  private scroll$: Observable<string>;
  private scrollSpies: { [key: string]: HTMLElement } = {};
  private scrolling: Subject<{ src: number, dest: number }>;

  constructor(@Inject(WINDOW) private _window: Window) {
    this.scroll$ = Observable.fromEvent(_window, 'scroll')
      .map(() => this.getLargestSpy());
    this.scrolling = new Subject<{ src: number, dest: number }>();
    this.scrolling.switchMap(({ src, dest }: { src: number, dest: number }) => {
      return this.getScrollPoints(src, dest);
    }).subscribe((y: number) => {
      this._window.scrollTo(this._window.scrollX, y);
    });
  }

  getScrolls() {
    return this.scroll$;
  }

  addScrollSpy(key: string, el: HTMLElement) {
    if (this.scrollSpies[key]) {
      throw new Error(`Scroll spy key already exists: ${key}`);
    }
    this.scrollSpies[key] = el;
  }

  getLargestSpy(): string {
    const y = this._window.scrollY;
    let largestSize = 0;
    let largestKey = '';
    for (let key in this.scrollSpies) {
      const el = this.scrollSpies[key];
      const rect = el.getBoundingClientRect();
      let visibleSize = this._window.innerHeight;
      const topOffset = rect.top;
      if (topOffset > 0) {
        visibleSize -= topOffset;
      }
      const bottomOffset = this._window.innerHeight - (rect.top + rect.height);
      if (bottomOffset > 0) {
        visibleSize -= bottomOffset;
      }
      if (visibleSize > largestSize) {
        largestSize = visibleSize;
        largestKey = key;
      }
    }
    return largestKey;
  }

  scrollToSection(key: string) {
    if (!this.scrollSpies[key]) {
      return;
    }
    const src = window.scrollY;
    const dest = this.getElementOffsetTop(this.scrollSpies[key]) - 60;
    this.scroll(src, dest);
  }

  private scroll(src: number, dest: number): void {
    this.scrolling.next({ src, dest });
  }

  private getScrollPoints(src: number, dest: number) {
    const nFrames = Math.max(Math.ceil(Math.abs(src - dest) / 15), 60);

    return Observable.timer(0, 1 / 60)
      .map((i) => this.ease(i / nFrames))
      .map((pt: number) => src + (dest - src) * pt)
      .take(nFrames + 1);
  }

  private ease(t: number): number {
    return t * t;
  }

  private getElementOffsetTop(el: HTMLElement): number {
    if (!el.offsetParent) {
      return el.offsetTop;
    }
    return el.offsetTop + this.getElementOffsetTop(el.offsetParent as HTMLElement);
  }
}

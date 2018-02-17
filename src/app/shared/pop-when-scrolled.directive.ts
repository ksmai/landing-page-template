import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  HostListener,
  Inject,
} from '@angular/core';

import { WINDOW } from '../core/window';

@Directive({
  selector: '[landingPopWhenScrolled]',
})
export class PopWhenScrolledDirective implements OnInit {
  @Input('landingPopWhenScrolled') delay: number = 0;
  private poped: boolean = false;

  constructor(private el: ElementRef, @Inject(WINDOW) private _window: Window) {
  }

  get isAnchor(): boolean {
    return this.el.nativeElement.tagName === 'A';
  }

  ngOnInit(): void {
    if (this.isAnchor) {
      this.el.nativeElement.style.transformOrigin = 'center bottom';
      this.el.nativeElement.style.transform = 'translateY(100%) scaleX(.75)';
      this.el.nativeElement.style.opacity = '0';
    } else {
      this.el.nativeElement.style.transform = 'scale(0)';
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.poped) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    if (rect.top > 10 && rect.top + 10 < this._window.innerHeight) {
      this.poped = true;
      if (this.isAnchor) {
        this.el.nativeElement.style.transition = `all .3s ease-out ${this.delay}ms`;
        this.el.nativeElement.style.transform = 'translateY(0) scaleX(1)';
        this.el.nativeElement.style.opacity = '1';
      } else {
        this.el.nativeElement.style.transition = `transform .25s ease-out ${this.delay}ms`;
        this.el.nativeElement.style.transform = 'scale(1)';
      }
    }
  }
}

import {
  Component,
  HostListener,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { ScrollService } from '../core/scroll.service';

const placeholder1 = require('../../../assets/placeholder.jpg');
const placeholder2 = require('../../../assets/placeholder-3.png');

export interface Project {
  name: string;
  photo: string;
}

@Component({
  selector: 'landing-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements AfterViewInit {
  projects: Project[] = [{
    name: 'Project 1',
    photo: placeholder1,
  }, {
    name: 'Project 2',
    photo: placeholder2,
  }, {
    name: 'Project 3',
    photo: placeholder1,
  }, {
    name: 'Project 4',
    photo: placeholder2,
  }, {
    name: 'Project 5',
    photo: placeholder1,
  }, {
    name: 'Project 6',
    photo: placeholder2,
  }];

  currentIndex: number = null;
  @ViewChild('portfolio') portfolioEl: ElementRef;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private scrollService: ScrollService,
  ) {
  }

  ngAfterViewInit(): void {
    this.scrollService.addScrollSpy('portfolio', this.portfolioEl.nativeElement);
  }

  openCarousel(idx: number): void {
    this.currentIndex = idx;
    this._document.body.style.overflow = 'hidden';
  }

  closeCarousel(): void {
    this.currentIndex = null;
    this._document.body.style.overflow = '';
  }

  onNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  onPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(e: KeyboardEvent) {
    if (this.currentIndex === null) {
      return;
    }
    switch (e.key) {
      case 'Escape':
        return this.closeCarousel();
      case 'ArrowLeft':
        return this.onPrevious();
      case 'ArrowRight':
        return this.onNext();
    }
  }
}

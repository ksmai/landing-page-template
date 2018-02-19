import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'landing-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements AfterViewInit {
  @ViewChild('about') aboutEl: ElementRef;

  constructor (private scrollService: ScrollService) {
  }

  ngAfterViewInit(): void {
    this.scrollService.addScrollSpy('about', this.aboutEl.nativeElement);
  }

  onGetStarted(): void {
    this.scrollService.scrollToSection('services');
  }
}

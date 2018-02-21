import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'landing-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements AfterViewInit {
  @ViewChild('splash') splashEl: ElementRef;

  constructor(private scrollService: ScrollService) {
  }

  ngAfterViewInit(): void {
    this.scrollService.addScrollSpy('home', this.splashEl.nativeElement);
  }

  onFindOutMore(): void {
    this.scrollService.scrollToSection('about');
  }
}

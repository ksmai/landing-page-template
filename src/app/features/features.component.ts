import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { ScrollService } from '../core/scroll.service';

export interface Feature {
  icon: string;
  name: string;
  content: string;
}

@Component({
  selector: 'landing-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  features: Feature[] = [{
    icon: 'diamond',
    name: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    icon: 'location-arrow',
    name: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    icon: 'newspaper-o',
    name: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    icon: 'heart',
    name: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }];

  @ViewChild('services') servicesEl: ElementRef;

  constructor (private scrollService: ScrollService) {
  }

  ngAfterViewInit(): void {
    this.scrollService.addScrollSpy('services', this.servicesEl.nativeElement);
  }
}

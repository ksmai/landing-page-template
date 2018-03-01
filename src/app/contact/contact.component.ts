import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'landing-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contact') contactEl: ElementRef;

  constructor (private scrollService: ScrollService) {
  }

  ngAfterViewInit(): void {
    this.scrollService.addScrollSpy('contact', this.contactEl.nativeElement);
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ScrollService } from '../core/scroll.service';

export interface NavLink {
  name: string;
  key: string;
}

@Component({
  selector: 'landing-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  toggled: boolean = false;
  isTop: boolean = true;
  subscription: Subscription = null;
  activeSection: string = '';
  navLinks: NavLink[] = [{
    name: 'About',
    key: 'about',
  }, {
    name: 'Services',
    key: 'services',
  }, {
    name: 'Portfolio',
    key: 'portfolio',
  }, {
    name: 'Contact',
    key: 'contact',
  }];


  constructor(private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.subscription = this.scrollService.getScrolls()
      .subscribe((activeSection: string) => this.onScroll(activeSection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggle(): void {
    this.toggled = !this.toggled;
  }

  onScroll(activeSection: string): void {
    this.isTop = window.scrollY < 50;
    this.activeSection = activeSection;
  }

  scrollTo(key: string, e: MouseEvent) {
    e.preventDefault();
    this.scrollService.scrollToSection(key);
  }
}

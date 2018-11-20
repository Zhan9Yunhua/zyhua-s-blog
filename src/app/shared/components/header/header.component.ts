import { Component, OnInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { animate, AnimationTriggerMetadata, style, transition, trigger, state } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  animations: [
    trigger('scroll', [
      state(
        'top',
        style({
          'padding-top': '25px'
        })
      ),
      state(
        'scrolling',
        style({
          'padding-top': '10px'
        })
      ),
      transition('* => *', [animate(150)])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  isDesktop = true;
  isMobileMenu = false;
  isTransparent = false;
  scrollState = 'top';

  constructor(public el: ElementRef) {
    const clientWidth = document.documentElement.clientWidth;
    this.isDesktop = clientWidth > 500;
  }

  onResize() {
    const el = fromEvent(window, 'resize');
    el.subscribe(e => {
      this.isDesktop = (e.target as Window).innerWidth > 500;
    });
  }

  onScroll() {
    const el = fromEvent(window, 'scroll');
    el.subscribe(e => {
      const navTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isTransparent = navTop > 60;
      this.scrollState = navTop > 60 ? 'scrolling' : 'top';
    });
  }

  onDrawer(e: Event) {
    e.stopPropagation();
    this.isMobileMenu = !this.isMobileMenu;
  }

  onCloseDrawer() {
    this.isMobileMenu = false;
  }

  onStopPropagation(e: Event) {
    e.stopPropagation();
  }

  ngOnInit() {
    this.onResize();
    this.onScroll();
  }
}

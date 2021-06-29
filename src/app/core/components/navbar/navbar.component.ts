import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})




export class NavbarComponent implements OnInit {

  scroll: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element: any = document.getElementById('navbar');
    if (window.pageYOffset > this.scroll && window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-scrolling');
      this.scroll = window.pageYOffset;
    } else {
      element.classList.remove('navbar-scrolling');
      this.scroll = window.pageYOffset;
    }
  }
}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { OnInit, AfterViewInit } from '@angular/core';
import { Header2Component } from '../../partials/header2/header2.component';
// import { AppEvent } from '../../../services/event.service';
import { APPEVENTS } from '../../../../data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event2Service } from '../../../services/event2.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, Header2Component, CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit, AfterViewInit {
  constructor (private eventService: Event2Service  ) {}
  appEvents: any =  [];
  ngOnInit(): void {
    this.updateContentPadding();
    const content = document.querySelector('.content') as HTMLElement;
    content.style.paddingTop = '80px'
    
    this.initdata();
  }

  initdata() {
    // this.appEvents = APPEVENTS;
    this.eventService.getAllEvents().subscribe(
      (res) => {
          console.log(res.result);
          this.appEvents = [res.result]
      }
    )
  }

  ngAfterViewInit(): void {
    // Listen for resize events and update padding dynamically
    window.addEventListener('resize', this.updateContentPadding);
  }

  private updateContentPadding(): void {
    const header = document.querySelector('.fixed-header') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;

    if (header && content) {
      const headerHeight = header.offsetHeight;
      content.style.paddingTop = `${headerHeight}px`;
    }
  }

}

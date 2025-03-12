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
import { FacultyService } from '../../../services/faculty.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, Header2Component, CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit, AfterViewInit {
  constructor (private eventService: Event2Service, private facultyService: FacultyService  ) {}
  appEvents: any ;
  faculties: any ;

  ngOnInit(): void {
    this.updateContentPadding();
    const content = document.querySelector('.content') as HTMLElement;
    content.style.paddingTop = '80px'
    
    this.initdata();
  }

  initdata() {
    // this.appEvents = APPEVENTS;
    this.eventService.getAllEventsByStatus("APPROVE").subscribe(
      (res) => {
          console.log(res.result);
          this.appEvents = res.result;
      }
    )

    this.facultyService.getAllFaculty().subscribe(
      (res) => {
        console.log(res.result);
        this.faculties = res.result;
      }
    )

  }

  ngAfterViewInit(): void {
    // Listen for resize events and update padding dynamically
    window.addEventListener('resize', this.updateContentPadding);
    const track = document.querySelector('.logo-track') as HTMLElement;
    const logos = document.querySelectorAll('.club-logo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let index = 0;
    const maxIndex = logos.length - 6; // Vì luôn hiển thị 6 logo

    function updateSlide() {
      track.style.transform = `translateX(-${index * 110}px)`;
    }

    nextBtn?.addEventListener('click', () => {
      if (index < maxIndex) {
        index++;
        updateSlide();
      }
    });

    prevBtn?.addEventListener('click', () => {
      if (index > 0) {
        index--;
        updateSlide();
      }
    });
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

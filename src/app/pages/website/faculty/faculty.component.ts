import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';
import { User2Service } from '../../../services/user2.service';
import { Event2Service } from '../../../services/event2.service';
import { EventUserService } from '../../../services/event-user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
// export class FacultyComponent implements OnInit{
//   facultyId: any;
//   faculty: any
//   appEvents: any;
//   user: any;
//   sql: any;

//   constructor(private route: ActivatedRoute, private userService: User2Service,
//               private eventService: Event2Service, private regisEventService: EventUserService,
//               private authService: AuthService
//   ){}

//   ngOnInit(): void {
//     this.facultyId = Number(this.route.snapshot.paramMap.get('id'));
//     this.userService.getUserbyId(this.facultyId).subscribe(
//       (res) => {
//         this.faculty = res.result;
//         console.log('faculty:', this.faculty);
//         this.loadSql();
//       }
//     )  
    
//   }

//   loadSql() {
//     this.sql ="http://localhost:8080/eventapp-service/event-user?faculty_id=" + this.faculty.id;
//     console.log('sql:',this.sql);
//   }
//   loadEvents(){
//     this.regisEventService.getEventRegister(this.sql).subscribe(
//       (res) => {
//         this.appEvents = res.result;
//         console.log('su kien', this.appEvents);
//       }
//     )
//     console.log('appEvents', this.appEvents);
//   }
// }
export class FacultyComponent implements OnInit {
  facultyId: any;
  faculty: any;
  appEvents: any;
  user: any;
  sql: any;

  constructor(
    private route: ActivatedRoute,
    private userService: User2Service,
    private eventService: Event2Service,
    private regisEventService: EventUserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.facultyId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserbyId(this.facultyId).subscribe(
      (res) => {
        this.faculty = res.result;
        console.log('faculty:', this.faculty);
        this.loadSql();
        this.loadEvents();
      }
    );
  }

  loadSql() {
    this.sql = "http://localhost:8080/eventapp-service/event-user?faculty_id=" + this.faculty.id;
    console.log('sql:', this.sql);
  }

  loadEvents() {
    this.regisEventService.getEventRegister(this.sql).subscribe(
      (res) => {
        this.appEvents = res.result.filter((event: { status: string; }) => event.status === "APPROVE");
        console.log('su kien', this.appEvents);
      }
    );
  }
}

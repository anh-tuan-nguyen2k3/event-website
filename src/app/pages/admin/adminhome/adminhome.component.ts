import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppEvent } from '../../../services/event.service';
import { APPEVENTS } from '../../../../data';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/user.service';
import { USERS } from '../../../../data';
import { Event2Service } from '../../../services/event2.service';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit{
  isLoggedIn: boolean = false;
  appEvents: AppEvent[] = [];
  pendingEvents: AppEvent[] = [];
  selectedTab: string = '';
  eventID = 4; 
  participants : User[] = []

  constructor(private router: Router, private eventSerive: Event2Service) { }

  ngOnInit(): void {
   this.initialApproveEvents();
   this.initialPendingEvents(); 
   
  }

  initialApproveEvents(){
    this.eventSerive.getAllEventsByStatus("approved").subscribe(
      (res) => {
          console.log(res.result);
          this.appEvents = res.result;
      }
    )
  }

  initialPendingEvents(){
    this.eventSerive.getAllEventsByStatus("pending").subscribe(
      (res) => {
          console.log(res.result);
          this.pendingEvents = res.result;
      }
    )
  }

  selectTab(tab: string, event: Event) {
    event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
    this.selectedTab = tab; // Cập nhật tab được chọn
  }

  onLogout() {
    // Xóa trạng thái đăng nhập và điều hướng về trang chủ
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}

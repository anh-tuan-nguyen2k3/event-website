import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppEvent } from '../../../services/event.service';
import { APPEVENTS } from '../../../../data';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/user.service';
import { USERS } from '../../../../data';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.appEvents = APPEVENTS;
    const event = APPEVENTS.find(e => e.eventID === this.eventID);
    if (event) {
      // Lọc danh sách USERS có ID trong danh sách participants của event
      this.participants = USERS.filter(user => event.participants.includes(user.idnumber));
    }
    this.pendingEvents = APPEVENTS.filter(event => event.status === 'Pending')
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

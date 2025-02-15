import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { APPEVENTS, USERS } from '../../../../data';
import { AppEvent } from '../../../services/event.service';
import { MatDialog } from '@angular/material/dialog';
declare var bootstrap: any; // Để sử dụng Bootstrap modal

@Component({
  selector: 'app-associateinfo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './associateinfo.component.html',
  styleUrl: './associateinfo.component.css'
})
export class AssociateinfoComponent implements AfterViewInit{
    selectedTab: string = 'personal-info';
    isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
    appEvents: AppEvent[] = [];
    color = '#F05A22'; // Màu mặc định của nút
    textColor = '#ffffff'; // Màu chữ mặc định
    participants: any[] = [];
    selectedEventTitle: string = '';
    constructor (private dialog: MatDialog) {}

    ngAfterViewInit(): void {
     this.initdata();
    }
  
    selectTab(tab: string, event: Event) {
      event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
      this.selectedTab = tab; // Cập nhật tab được chọn
      this.initdata();
      console.log(`Tab được chọn: ${tab}`);
    }
    test: any;
    user: any;
    initdata() {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        this.user = JSON.parse(loggedInUser); // Chuyển đổi từ chuỗi JSON sang đối tượng
        this.isLoggedIn = true;
  
        console.log(this.user, 123)
        }
        this.loadEvents();
    }
    loadEvents() {
      if (this.isLoggedIn && this.user) {
        this.appEvents = APPEVENTS.filter(event => event.participants.includes(this.user.idnumber));
      } else {
        this.appEvents = [];
      }  }
  
    onClick() {
      console.log("Add event button is clicked");
      const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);      
      modal.show();
    }
    }
    
    onMouseOver() {
      
    }
    
    onMouseOut() {
     
    }

    openParticipantModal(event: any) {
      this.selectedEventTitle = event.title;
      this.participants = USERS.filter(user => event.participants.includes(user.idnumber));
  
      // Hiển thị modal bằng Bootstrap JS
      const modalElement = document.getElementById('participantModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
}

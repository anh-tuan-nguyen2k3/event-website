import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppEvent } from '../../../services/event.service';
import { APPEVENTS } from '../../../../data';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/user.service';
import { USERS } from '../../../../data';
import { Event2Service } from '../../../services/event2.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit{
  isLoggedIn: boolean = false;
  appEvents: AppEvent[] = [];
  pendingEvents: AppEvent[] = [];
  selectedTab: string = '';
  eventID = 4; 
  color = '#F05A22'; // Màu mặc định của nút
  textColor = '#ffffff'; // Màu chữ mặc định
  // faculties : User[] = []
  organizationName: string = '';
  organizationEmail: string = '';
  faculties: any[] = [
    { email: 'artclub@example.com', faculty_name: 'Art Club' },
    { email: 'robotics@example.com', faculty_name: 'Robotics Club' },
    { email: 'environment@example.com', faculty_name: 'Environment Club' }
  ];
  participants: any[] = [];
  selectedEventTitle: string = '';
  

  constructor(private router: Router, private eventSerive: Event2Service) { }

  ngOnInit(): void {
   this.initialApproveEvents();
   this.initialPendingEvents(); 
   
  }

  initialApproveEvents(){
    // this.eventSerive.getAllEventsByStatus("approved").subscribe(
    //   (res) => {
    //       console.log(res.result);
    //       this.appEvents = res.result;
    //   }
    // )
    this.appEvents = APPEVENTS;
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
  onClick() {
    console.log("Add event button is clicked");
    const modalElement = document.getElementById('organizationModal');
  if (modalElement) {
    const modal = new (window as any).bootstrap.Modal(modalElement);      
    modal.show();
  }
  }
  onMouseOver() {
      
  }
  
  onMouseOut() {
   
  }
  

  addOrganization() {
    if (this.organizationName.trim() && this.organizationEmail.trim()) {
      // Thêm tổ chức mới vào danh sách
      this.faculties.push({
        faculty_name: this.organizationName,
        email: this.organizationEmail
      });

      // Reset input sau khi thêm
      this.organizationName = '';
      this.organizationEmail = '';

      // Đóng modal sau khi thêm thành công
      const modalElement = document.getElementById('organizationModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.hide();
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
  openParticipantModal(event: any) {
        this.selectedEventTitle = event.title;
        this.participants = USERS.filter(user => event.participants.includes(user.idnumber));
    
        // Hiển thị modal bằng Bootstrap JS
        const modalElement = document.getElementById('participantModal');
        if (modalElement) {
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.show();
        }
      }

}

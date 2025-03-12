import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppEvent } from '../../../services/event.service';
import { APPEVENTS } from '../../../../data';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/user.service';
import { USERS } from '../../../../data';
import { Event2Service } from '../../../services/event2.service';
import { FormsModule } from '@angular/forms';
import { EventUserService } from '../../../services/event-user.service';
import { User2Service } from '../../../services/user2.service';
import { FacultyService } from '../../../services/faculty.service';

declare var bootstrap: any;

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  appEvents: AppEvent[] = [];
  pendingEvents: any = [];
  selectedTab: string = 'dashboard';
  eventID = 4; 
  color = '#F05A22'; // Màu mặc định của nút
  textColor = '#ffffff'; // Màu chữ mặc định
  // faculties : User[] = []
  organizationName: string = '';
  organizationEmail: string = '';
  faculties: any;
  participants: any[] = [];
  selectedEventTitle: string = '';
  selectedEvent: any;
  showRejectReason = false;
  rejectReason = '';
  cdRef: any;
  message: string = '';

  constructor(private router: Router, private eventSerive: Event2Service, private eventUserService: EventUserService, 
    private userService: User2Service, private facultyService: FacultyService
  ) { }

  ngOnInit(): void {
    this.initialApproveEvents();
    this.initialPendingEvents();
    this.getFaculities();
  }

  getFaculities(){
    this.facultyService.getAllFaculty().subscribe(
      (res) => {
        this.faculties = res.result;
      }
    )
      
    
  }

  initialApproveEvents() {
    this.eventSerive.getAllEventsByStatus("APPROVE").subscribe(
      (res) => {
        console.log(res.result);
        this.appEvents = res.result;
      }
    )
    // this.appEvents = APPEVENTS;
  }

  initialPendingEvents() {
    this.eventSerive.getAllEventsByStatus("PENDING").subscribe(
      (res) => {
        console.log(res.result);
        this.pendingEvents = res.result;
      }
    )
  }

  initialFaculties () {
    this.userService.getUserbyId(1).subscribe(
      (res) => {
        console.log("faculties:",res.result);
        this.faculties = res.result
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
    if (!this.isEmailValid(this.organizationEmail)) {
      this.message = 'Email không đúng định dạng!';
    } else {
      if (this.organizationName.trim() && this.organizationEmail.trim()) {
        // Thêm tổ chức mới vào danh sách
  
        this.faculties.push({
          faculty_name: this.organizationName,
          email: this.organizationEmail
        });
  
        // Reset input sau khi thêm
        this.organizationName = '';
        this.organizationEmail = '';
        this.message = '';
        // Đóng modal sau khi thêm thành công
        const modalElement = document.getElementById('organizationModal');
        if (modalElement) {
          let modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
      } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
      };
      
      
      

    } 
    
    if (this.organizationName.trim() && this.organizationEmail.trim()) {
      const data = {
        email: this.organizationEmail,
        facultyName: this.organizationName
      }
      // Thêm tổ chức mới vào danh sách
      this.userService.saveFaculty(data).subscribe(
        (res) => {
          this.organizationName = '';
          this.organizationEmail = '';

          // Đóng modal sau khi thêm thành công
          const modalElement = document.getElementById('organizationModal');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.hide();
          }

          window.location.href="/admin"
        }
      )
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
  openParticipantModal(event: any) {
    // this.selectedEventTitle = this.selectedEvent.title;

    this.eventUserService.getUserByEvent(event.id).subscribe(
      (res) => {
        this.participants = res.result;
      }
    )
    // Hiển thị modal bằng Bootstrap JS
    const modalElement = document.getElementById('participantModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openModal(event: any) {
    this.selectedEvent = event;
    const modalElement = document.getElementById('eventDetailModal');
    if (modalElement) {
      // Ensure Bootstrap is available and correctly initialized
      const bootstrap = (window as any).bootstrap;
      this.showRejectReason = false;
      if (bootstrap && bootstrap.Modal) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Bootstrap Modal is not initialized correctly.');
      }
    } else {
      console.error('Modal element not found.');
    }


    //   this.selectedEvent = event;
    //   const modalElement = document.getElementById('eventDetailModal');
    //   if (modalElement) {
    //     const modal = new (window as any).bootstrap.Modal(modalElement);
    //     modal.show();
    //   }

  }


  approveEvent() {
    // alert('Sự kiện đã được duyệt!');
    console.log(this.selectedEvent);
    this.eventService.updateStatus(this.selectedEvent.id, "APPROVE").subscribe(
      (res) => {
        window.location.href = '/admin';
      }
    )
  }
  // của H
  // rejectEvent() {
  //   //alert('Sự kiện đã bị từ chối!');
  //   this.eventSerive.updateStatus(this.selectedEvent.id, "REJECT").subscribe(
  //     (res) => {
  //       window.location.href = '/admin';
  //     }
  //   )
  // }

  rejectEvent() {
    this.showRejectReason = true; // Hiển thị ô nhập lý do
    console.log(this.showRejectReason);

  }

  confirmReject() {
    if (!this.rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }

    this.eventService.updateStatus(this.selectedEvent.id, "REJECT").subscribe(
      (res) => {
        window.location.href = '/admin';
      }
    );
    this.closeModal()
    // Reset sau khi từ chối
    this.showRejectReason = false;
  }

  closeModal() {                                                
    let modalElement = document.getElementById('eventDetailModal');
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra định dạng email
    return emailRegex.test(email);
  }

  finished(){
    this.closeModal();
  }

}

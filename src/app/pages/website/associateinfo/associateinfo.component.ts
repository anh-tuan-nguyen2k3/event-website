import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { APPEVENTS, USERS } from '../../../../data';
import { AppEvent } from '../../../services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Event2Service } from '../../../services/event2.service';
import { User2Service } from '../../../services/user2.service';
declare var bootstrap: any; // Để sử dụng Bootstrap modal

@Component({
  selector: 'app-associateinfo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './associateinfo.component.html',
  styleUrl: './associateinfo.component.css'
})
export class AssociateinfoComponent implements OnInit, AfterViewInit{
    selectedTab: string = 'personal-info';
    isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
    appEvents: AppEvent[] = [];
    color = '#F05A22'; // Màu mặc định của nút
    textColor = '#ffffff'; // Màu chữ mặc định
    participants: any[] = [];
    selectedEventTitle: string = '';
    selectedEvent: any;
    test: any;
    isEditing: boolean | undefined;
    tempName: any;
    tempEmail: any;
    tempdescription: any;
    showRejectReason = false;
    constructor (private dialog: MatDialog, private authService: AuthService, private eventService: Event2Service, private userService: User2Service) {}

    ngOnInit(): void {
      const userId = this.authService.getUserId();
      if(userId !== null)
        this.userService.getUserbyId(userId).subscribe(
          (res) => {
            this.user = res.result;
            console.log('user:',this.user)
          }
        )
    }



    user: any = {
      email: 'nguyenanhtuan1.442003@gmail.com',
      name: 'Đoàn khoa Hệ thống thông tin',
      faculty_description: '',
    };

    event = {
      faculty_id: -1,
      title: '',
      startDate: '',
      endDate: '',
      location: '',
      participants: 0,
      catgoryId: 0,
      description: '',
      bannerUrl: null,
      imageUrl: null
    };
  

    onFileSelect(event: any) {
      const file = event.target.files[0];
      if (event.target.name === 'image-banner') {
        this.event.bannerUrl = file;
      } else if (event.target.name === 'image-avatar') {
        this.event.imageUrl = file;
      }
      console.log(file)
    }  

    ngAfterViewInit(): void {
      this.initdata();
      this.initialEvents()

    }
  
    selectTab(tab: string, event: Event) {
      event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
      this.selectedTab = tab; // Cập nhật tab được chọn
      this.initdata();
      console.log(`Tab được chọn: ${tab}`);
    }


    initdata() {
      const loggedInUser = localStorage.getItem('token');
      if (loggedInUser) {
        this.isLoggedIn = true;
        this.event.faculty_id = this.authService.getUserId();
        console.log(this.event.faculty_id)
      }
      // this.loadEvents();
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

    onSubmit() {
      const formData = new FormData();
      formData.append('faculty_id', this.event.faculty_id.toString());
      formData.append('title', this.event.title);
      formData.append('description', this.event.description);
      formData.append('startDate', this.event.startDate);
      formData.append('endDate', this.event.endDate);
      formData.append('location', this.event.location);
      formData.append('participants', this.event.participants.toString());
      formData.append('catgoryId', this.event.catgoryId.toString());
      if(this.event.bannerUrl !== null)
        formData.append('bannerUrl', this.event.bannerUrl);
      if(this.event.imageUrl !== null)
      formData.append('imageUrl', this.event.imageUrl);

      console.log(formData);

      this.eventService.save(formData).subscribe(
        (res) => {
          if(res.code === 1000){
            console.log("success!");
          }
        }
      )
    }
  
    onCancel() {
      // Add your logic to handle the cancel action here
    }

    onCategoryChange(event: any) {
      this.event.catgoryId = +event.target.value;
    }
    passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    changePassword() {
      if (!this.passwordData.currentPassword || !this.passwordData.newPassword || !this.passwordData.confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
    
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        alert("Mật khẩu mới và nhập lại không khớp!");
        return;
      }
    
      console.log("Đổi mật khẩu thành công!", this.passwordData);
      alert("Mật khẩu đã được thay đổi!");
      
      // Reset form
      this.passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
    
    startEditing() {
      this.tempName = this.user.facultyName; // Lưu giá trị ban đầu
      this.tempEmail = this.user.email;
      this.tempdescription = this.user.facultyDescription;
      this.isEditing = true; // Bật chế độ chỉnh sửa
    }
  
    saveChanges() {
      if (this.tempName.trim()) {
        this.user.name = this.tempName; // Cập nhật dữ liệu mới
      }
      if (this.tempEmail.trim()) {
        this.user.email = this.tempEmail // Cập nhật dữ liệu mới
      }
      this.isEditing = false; // Ẩn input, hiển thị lại span
    }

    initialEvents(){
      this.eventService.getAllEvents().subscribe(
        (res) => {
            console.log('all events: ',res.result);
            this.appEvents = res.result;
        }
      )
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
    
    }
}

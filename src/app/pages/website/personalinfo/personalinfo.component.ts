import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { APPEVENTS } from '../../../../data';
import { AppEvent } from '../../../services/event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personalinfo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './personalinfo.component.html',
  styleUrl: './personalinfo.component.css'
})
export class PersonalinfoComponent implements AfterViewInit{
  selectedTab: string = 'personal-info';
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
  appEvents: AppEvent[] = [];
  color = '#F05A22'; // Màu mặc định của nút
  textColor = '#ffffff'; // Màu chữ mặc định
  
  user = {
    email: 'example@student.com',
    name: 'Nguyễn Văn A',
    idnumber: '12345678',
    phone: '0987654321'
  };

  isEditing = false;
  tempName = this.user.name;

  // toggleEdit() {
  //   this.isEditing = !this.isEditing;
  //   if (!this.isEditing) {
  //     this.user.name = this.tempName; // Lưu lại khi ấn "Lưu"
  //   }
  // }
  startEditing() {
    this.tempName = this.user.name; // Lưu giá trị ban đầu
    this.isEditing = true; // Bật chế độ chỉnh sửa
  }

  saveChanges() {
    if (this.tempName.trim()) {
      this.user.name = this.tempName; // Cập nhật dữ liệu mới
    }
    this.isEditing = false; // Ẩn input, hiển thị lại span
  }


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
  // user: any;
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
    console.log("Button Thêm sự kiện được nhấn!");
    // Thêm logic mở modal/tạo sự kiện ở đây
  }
  
  onMouseOver() {
    
  }
  
  onMouseOut() {
   
  }

}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { APPEVENTS } from '../../../../data';
import { AppEvent } from '../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { User2Service } from '../../../services/user2.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personalinfo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './personalinfo.component.html',
  styleUrl: './personalinfo.component.css'
})
export class PersonalinfoComponent implements AfterViewInit, OnInit{
  selectedTab: string = 'personal-info';
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
  appEvents: AppEvent[] = [];
  color = '#F05A22'; // Màu mặc định của nút
  textColor = '#ffffff'; // Màu chữ mặc định
  // user?: any;
  tempName: any;
  tempPhone: any;
  tempId: any;
  isEditing: boolean | undefined;

  user: any = {
    email: 'nguyenanhtuan1.442003@gmail.com',
    name: '',
    phone: '',
    idnumber: ''
  };
  

  constructor(private userService: User2Service, private authService: AuthService){}
  ngOnInit(): void {
    // const userId = this.authService.getUserId();
    // if(userId !== null)
    //   this.userService.getUserbyId(userId).subscribe(
    //     (res) => {
    //       this.user = res.result;
    //     }
    //   )
    // else
    //   window.location.href="/login";
  }
  

  // isEditing = false;
  // tempName = this.user.name;
  // tempPhone = this.user.phone;
  // tempId = this.user.idnumber


  // toggleEdit() {
  //   this.isEditing = !this.isEditing;
  //   if (!this.isEditing) {
  //     this.user.name = this.tempName; // Lưu lại khi ấn "Lưu"
  //   }
  // }
  startEditing() {
    this.tempName = this.user.username; // Lưu giá trị ban đầu
    this.tempPhone = this.user.phone
    this.tempId = this.user.idnumber
    this.isEditing = true; // Bật chế độ chỉnh sửa
  }

  saveChanges() {
    if (this.tempName.trim()) {
      this.user.name = this.tempName; // Cập nhật dữ liệu mới
    }
    if (this.tempPhone.trim()) {
      this.user.phone = this.tempPhone // Cập nhật dữ liệu mới
    }
    if (this.tempId.trim()) {
      this.user.idnumber = this.tempId // Cập nhật dữ liệu mới
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

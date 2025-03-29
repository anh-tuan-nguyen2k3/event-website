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
import { EventUserService } from '../../../services/event-user.service';
import { CategoryService } from '../../../services/category.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-personalinfo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './personalinfo.component.html',
  styleUrl: './personalinfo.component.css'
})
export class PersonalinfoComponent implements AfterViewInit, OnInit {
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

  user: any  // user?: any;
  selectedStatus: any = ''; // Lưu giá trị đơn vị được chọn
  selectedCategory: any = '';
  sql :any = "";
  categories: any;

  constructor(private userService: User2Service, private authService: AuthService, private regisEventService: EventUserService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.categoryService.getAllEvents().subscribe(
      (res)=> {
        this.categories = res.result
      }
    )
    if (userId !== null)
      this.userService.getUserbyId(userId).subscribe(
        (res) => {
          this.user = res.result;
          console.log('user:', this.user)
          this.sql = "http://localhost:8080/eventapp-service/event-user/user?faculty_id=" + this.user.id;
        }
      )
    else
      window.location.href = "/login";
  }

  startEditing() {
    this.tempName = this.user.username; // Lưu giá trị ban đầu
    this.tempPhone = this.user.phone
    this.tempId = this.user.idnumber
    this.isEditing = true; // Bật chế độ chỉnh sửa

  }

  saveChanges() {
    const data = {
      username: this.tempName,
      phone: this.tempPhone
    }
    console.log(data);
    this.userService.updateAccount(this.user.id, data).subscribe(
      (res) => {
        if (res.code === 1000)
          alert("Cập nhật thành công !!!");
        if (this.tempName.trim()) {
          this.user.name = this.tempName; // Cập nhật dữ liệu mới
        }
        if (this.tempPhone.trim()) {
          this.user.phone = this.tempPhone // Cập nhật dữ liệu mới
        }
        if (this.tempId.trim()) {
          this.user.idnumber = this.tempId // Cập nhật dữ liệu mới
        }
      }
    )
    this.user.username = this.tempName; 
    this.user.phone = this.tempPhone;
    this.user.idnumber = this.tempId;

    const toastElement = document.getElementById('successToast');
                            if (toastElement) {
                                const toast = new Toast(toastElement);
                                toast.show();}
    



    this.isEditing = false; // Ẩn input, hiển thị lại span
  }


  ngAfterViewInit(): void {
    // this.initdata();
    // this.filter(this.sql)
  }

  selectTab(tab: string, event: Event) {
    event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
    this.selectedTab = tab; // Cập nhật tab được chọn
    this.initdata();
    console.log(`Tab được chọn: ${tab}`);
  }
  // user: any;
  initdata() {
    this.filter(this.sql)
  }
  
  onClick() {
    console.log("Button Thêm sự kiện được nhấn!");
    // Thêm logic mở modal/tạo sự kiện ở đây
  }

  onMouseOver() {

  }

  onMouseOut() {

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

    const data = {
      password: this.passwordData.newPassword
    }
    console.log(this.user.id);
    this.userService.updateAccount(this.user.id, data).subscribe(
      (res) => {
        if(res.code === 1000){
          alert("Đổi mật khẩu thành công!");
        }
      }
    )

    // Reset form
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  changeCategory(){
    console.log(this.selectedCategory);
    this.filter(this.check());
  }

  changeStatus(){
    console.log(this.selectedStatus);
    this.filter(this.check());
  }

  check(): string {
      let tmp = "";
      if(this.selectedCategory !== "" ){
        tmp = tmp +  "&categoryId=" + this.selectedCategory;
      }
  
      if(this.selectedStatus !== ""){
        tmp = tmp + "&status=" + this.selectedStatus;
      }
      return this.sql + tmp;
  }

  filter(sql: string){
    this.regisEventService.getEventRegister(sql).subscribe(
      (res) => {
        this.appEvents = res.result;
        console.log('list event', this.appEvents)

      }
    )
  }

}

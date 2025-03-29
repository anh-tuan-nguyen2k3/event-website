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
import { CategoryService } from '../../../services/category.service';
import { EventUserService } from '../../../services/event-user.service';
import { Toast } from 'bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    appEvents: any;
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
    avatar: any= null;
    user: any;
    selectedStatus: any = ''; // Lưu giá trị đơn vị được chọn
    selectedCategory: any = '';
    sql :any;
    categories: any;
    constructor (private dialog: MatDialog, private authService: AuthService, 
    private eventService: Event2Service, private userService: User2Service,
    private categoryService: CategoryService, private regisEventService: EventUserService,
    private eventUserService : EventUserService) {}

    ngOnInit(): void {
      const userId = this.authService.getUserId();
      this.categoryService.getAllEvents().subscribe(
        (res)=> {
          this.categories = res.result
        }
      )
      if(userId !== null)
        this.userService.getUserbyId(userId).subscribe(
          (res) => {
            this.user = res.result;
            console.log('user:',this.user)
            this.sql ="http://localhost:8080/eventapp-service/event-user?faculty_id=" + this.user.id;
          }
        )
      
    }
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
      }else if (event.target.name === 'image-account') {
        this.avatar = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
        this.user.facultyLogo = e.target.result; // Cập nhật trực tiếp user.facultyLogo
      };
        reader.readAsDataURL(file);
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
        console.log('???',this.event.faculty_id)
      }
      this.loadEvents();
    }

    loadEvents() {
      this.filter(this.sql)
    }
  
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
      // this.participants = USERS.filter(user => event.participants.includes(user.idnumber));
      this.eventUserService.getUserByEvent(event.id).subscribe(
        (res) => {
          this.participants = res.result;
        }
      )
  
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
      formData.append('totalSeats', this.event.participants.toString());
      formData.append('catgoryId', this.event.catgoryId.toString());
      if(this.event.bannerUrl !== null)
        formData.append('bannerUrl', this.event.bannerUrl);
      if(this.event.imageUrl !== null)
      formData.append('imageUrl', this.event.imageUrl);

      console.log("data" + formData);

      this.eventService.save(formData).subscribe(
        (res) => {
          if(res.code === 1000){
            console.log("success!");      
          }
          const toastElement = document.getElementById('successToast');
                        if (toastElement) {
                            const toast = new Toast(toastElement);
                            toast.show();
                            setTimeout(() => {
                                window.location.href = '/associateinfo';
                            }, 2000);
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
    
    startEditing() {
      this.tempName = this.user.facultyName; // Lưu giá trị ban đầu
      this.tempEmail = this.user.email;
      this.tempdescription = this.user.facultyDescription;
      this.isEditing = true; // Bật chế độ chỉnh sửa
    }
  
    saveChanges() {
      const formData = new FormData();
      formData.append('faculty_id', this.user.id);
      formData.append('facultyName', this.tempName);
      formData.append('facultyDescription', this.tempdescription);
      if(this.avatar != null)
        formData.append('facultyLogo', this.avatar);

      console.log(formData);
      

      this.userService.updateFaculty(this.user.id, formData).subscribe(
        (res) => {
          if(res.code === 1000){
            console.log("success!");
          }
        }
      )
      this.user.facultyName = this.tempName;
      this.user.facultyDescription = this.tempdescription
      this.isEditing = false;
      
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
          console.log('su kien', this.appEvents);
          
        }
      )
    }
    downloadParticipants(){
      if (!this.participants || this.participants.length === 0) {
        console.warn('Không có dữ liệu để xuất!');
        return;
      }
      
      // Tạo dữ liệu cho bảng
      const data = this.participants.map((user, index) => [
        index + 1,
        user.id,
        user.username,
        user.email
      ]);
      
      // Thêm tiêu đề
      const title = [[this.selectedEvent?.title || 'Danh sách đăng ký']];
      const header = [['STT', 'Mã số sinh viên', 'Họ và Tên', 'Email']];
      
      // Kết hợp tiêu đề, header và dữ liệu
      const finalData = [...title, [], ...header, ...data];
      
      // Tạo worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(finalData);
      
      // Merge ô cho tiêu đề (ô A1 đến D1)
      worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
      
      // Tùy chỉnh độ rộng các cột
      worksheet['!cols'] = [
        { wch: 5 },   // STT
        { wch: 15 },  // Mã số sinh viên
        { wch: 20 },  // Họ và Tên
        { wch: 25 }   // Email
      ];
      
      // Tạo workbook và thêm sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');
      
      // Xuất file Excel
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'Danh_sach_dang_ky.xlsx');
      
    }

    openComment(event: any) {
      this.selectedEvent = event; // Gán sự kiện được chọn
      const modal = new bootstrap.Modal(document.getElementById('commentModal')); // Mở modal
      modal.show();
    }
}

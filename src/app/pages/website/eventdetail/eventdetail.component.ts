import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppEvent } from '../../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { APPEVENTS } from '../../../../data';
import { FormsModule } from '@angular/forms';

declare var bootstrap : any;

@Component({
  selector: 'app-eventdetail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './eventdetail.component.html',
  styleUrl: './eventdetail.component.css'
})
export class EventdetailComponent implements OnInit, AfterViewInit{
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
  eventID: number | null = null;
  eventDetail: AppEvent | undefined;
  isRegisteredForEvent: boolean = false; // Trạng thái đã đăng ký


  constructor(private route: ActivatedRoute) {}
  openModal() {
    const modalElement = document.getElementById('registerModal')!;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (this.isRegisteredForEvent) {
      return;
    }
    
    if (loggedInUser) {
    const user = JSON.parse(loggedInUser); // Chuyển đổi từ chuỗi JSON sang đối tượng
    this.isLoggedIn = true;
    // Gán thông tin người dùng vào các trường trong form
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    const idnumber = document.getElementById('idnumber') as HTMLInputElement;

    if (usernameInput && emailInput) {
      usernameInput.value = user.name; // Hiển thị tên người dùng
      emailInput.value = user.email;  // Hiển thị email
      phone.value = user.phone;
      idnumber.value = user.idnumber;
    }

    }

    modal.show();

  }
  
  ngOnInit(): void {
    this.updateContentPadding();
    const content = document.querySelector('.content') as HTMLElement;
    content.style.paddingTop = '80px'

    this.eventID = Number(this.route.snapshot.paramMap.get('id'));
    this.eventDetail = APPEVENTS.find(event => event.eventID === this.eventID);

    this.checkRegistration();

  }

  checkRegistration(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && this.eventID) {
      const user = JSON.parse(loggedInUser);
      console.log("Danh sách sự kiện đã đăng ký của user:", user.regisEvent); // In ra danh sách eventID đã đăng ký

      if (user.regisEvent && user.regisEvent.includes(this.eventID.toString())) {
        this.isRegisteredForEvent = true;
      }
    }
    console.log(this.eventID);
    console.log(this.isRegisteredForEvent);
          
  }

  ngAfterViewInit(): void {
    // Listen for resize events and update padding dynamically
    window.addEventListener('resize', this.updateContentPadding);
  }

  private updateContentPadding(): void {
    const header = document.querySelector('.fixed-header') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;

    if (header && content) {
      const headerHeight = header.offsetHeight;
      content.style.paddingTop = `${headerHeight}px`;
    }
  }
  formData = {
    username: '',
    email: '',
    idnumber: '',
    phone: ''
  };

  submitForm() {
    console.log('Dữ liệu form:', this.formData);
    // alert('Form submitted!'); 
    let modalElement = document.getElementById('registerModal');
    if (modalElement) {
      let modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    
    }
    
    
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppEvent } from '../../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { APPEVENTS } from '../../../../data';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User2Service } from '../../../services/user2.service';
import { EventUserService } from '../../../services/event-user.service';
import { Event2Service } from '../../../services/event2.service';

declare var bootstrap: any;

@Component({
  selector: 'app-eventdetail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './eventdetail.component.html',
  styleUrl: './eventdetail.component.css'
})
export class EventdetailComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
  eventID: any;
  eventDetail: AppEvent | undefined;
  isRegisteredForEvent: boolean = false; // Trạng thái đã đăng ký
  user: any = null;
  participants: any[] = [];
  buttonColor: string = '';
  constructor(private route: ActivatedRoute, private authService: AuthService,
  private userService: User2Service, private eventUserSerivce: EventUserService,private eventService: Event2Service) { }



  openModal() {
    const modalElement = document.getElementById('registerModal')!;
    const modal = new (window as any).bootstrap.Modal(modalElement);

    if (this.isRegisteredForEvent) {
      return;
    }

    if (this.user !== null) {
      // Gán thông tin người dùng vào các trường trong form
      const usernameInput = document.getElementById('username') as HTMLInputElement;
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const phone = document.getElementById('phone') as HTMLInputElement;
      const idnumber = document.getElementById('idnumber') as HTMLInputElement;

      if (usernameInput && emailInput) {
        usernameInput.value = this.user.username; // Hiển thị tên người dùng
        emailInput.value = this.user.email;  // Hiển thị email
        phone.value = this.user.phone;
        idnumber.value = this.user.id;
      }

    }

    modal.show();

  }

  ngOnInit(): void {
    this.updateContentPadding();
    const content = document.querySelector('.content') as HTMLElement;
    content.style.paddingTop = '80px';
  
    this.eventID = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.eventID)) {
      console.error("Invalid event ID");
      return;
    }
  
    console.log(typeof this.eventID);
  
    this.eventService.getEventById(this.eventID).subscribe(
      (res) => {
        this.eventDetail = res.result;
        console.log('Chi tiết sự kiện', this.eventDetail);
      }
    );
  
    this.eventUserSerivce.getUserByEvent(this.eventID).subscribe(
      (res) => {
        this.participants = res.result;
        console.log('Người tham gia', this.participants);
        this.checkRegistration(); // Ensure user data exists before calling
      }
    );
  
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      this.userService.getUserbyId(this.authService.getUserId()).subscribe(
        (res) => {
          this.user = res.result;
          console.log('User', this.user);
          console.log('User email', this.user.email);
  
          // Now check registration after user is set
          this.checkRegistration();
        }
      );
    }
    
  }
  
  checkRegistration(): void {
    if (!this.user || !this.participants) {
      console.warn("User or participants data not available yet.");
      return;
    }
  
    this.isRegisteredForEvent = this.participants.some(p => p.id === this.user.id);
    console.log('Danh sách người tham gia:', this.participants);
    console.log('User email:', this.user.email);
    console.log('Đăng ký chưa?', this.isRegisteredForEvent);
    this.buttonColor = this.isRegisteredForEvent ? '#6c757d' : '#F05A22';
    console.log('mau button', this.buttonColor);
    

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
    if(this.user != null){
      const data = {
        event_id: this.eventID,
        user_id: this.user.id,
      }
      this.eventUserSerivce.reisterEvent(data).subscribe(
        (res) => {
            alert("Đăng ký sự kiện thành công")
        }
      )
    }else{
      const data = {
        event_id: this.eventID,
        guestName: this.formData.username,
        emailGuest: this.formData.email,
        phoneGuest: this.formData.phone
      }
      this.eventUserSerivce.reisterEvent(data).subscribe(
        (res) => {
            alert("Đăng ký sự kiện thành công")
        }
      )
    }
    
    this.checkRegistration();

    let modalElement = document.getElementById('registerModal');
    if (modalElement) {
      let modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();

    }
    
  }
}

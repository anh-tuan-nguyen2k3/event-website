import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-eventdetail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './eventdetail.component.html',
  styleUrl: './eventdetail.component.css'
})
export class EventdetailComponent implements OnInit, AfterViewInit{
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa

  openModal() {
    const modalElement = document.getElementById('registerModal')!;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    const loggedInUser = localStorage.getItem('loggedInUser');
    
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
  constructor () {}
  ngOnInit(): void {
    this.updateContentPadding();
    const content = document.querySelector('.content') as HTMLElement;
    content.style.paddingTop = '80px'
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
}

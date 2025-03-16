import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User2Service } from '../../../services/user2.service';
import { CommonModule } from '@angular/common';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, AfterViewInit {
  constructor (private userService: User2Service) {}
  message: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  passwordCheck: string = '';


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
  // onSubmit() {
  //   if(this.password != this.passwordCheck){
  //     this.message="Mật khẩu không trùng khớp!";
  //   }else{
  //     const data = {
  //       email: this.email,
  //       username: this.username,
  //       password: this.password,
  //     }
  //     this.userService.register(data).subscribe(
  //       (res)=> {
  //         window.location.href='/login';
  //       }
  //     );
  //   }  
  // }
  onSubmit() {
    this.message = "";
    if (!this.isEmailValid(this.email)) {
        this.message = "Email không đúng định dạng!";
    } else {
      if (this.password != this.passwordCheck) { 
        this.message = "Mật khẩu không trùng khớp!" 
      } else {
        const data = {
            email: this.email,
            username: this.username,
            password: this.password,
        }
        
        // 
        this.userService.register(data).subscribe({
          next: (res) => {
              // Xử lý khi đăng ký thành công
              const toastElement = document.getElementById('successToast');
              if (toastElement) {
                  const toast = new Toast(toastElement);
                  toast.show();
                  setTimeout(() => {
                      window.location.href = '/login';
                  }, 2000);
              }
          },
          error: (err) => {
              // Xử lý lỗi thực sự
              if (err.status === 400) { // Conflict - thường dùng cho tài khoản đã tồn tại
                  this.message = "Tài khoản đã tồn tại!";
              } 
          }
      });
    }
    } 
    
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  resetMessage () {
    this.message="";
  }
  
  
  }

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { Header2Component } from '../../partials/header2/header2.component';
import { AuthService } from '../../../services/auth.service';
import { Route, Router } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, CommonModule, Header2Component, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  message: string = '';
  auth: any;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      window.location.href = '/home'
    }
  }

  login() {
    console.log(123)
    // Kiểm tra định dạng email
     if (!this.isEmailValid(this.email)) {
        this.message = 'Email không đúng định dạng!';
        return; // Dừng xử lý nếu email sai định dạng
      }else{
        const req = {
          email: this.email,
          password: this.password
        }
        this.authService.authenticate(req).subscribe(
          (res) => {
              const role_id : number|null = this.authService.decodeToken(res.result.token).scope;
              console.log(role_id)
              if(role_id == 3 || role_id == 2){
                this.router.navigateByUrl('/home')
              }else if(role_id == 1){
                this.router.navigateByUrl('/admin')
              }
          }
        )
      }
    // Tìm kiếm người dùng với email và mật khẩu khớp
    
  }

  resetMessage () {
    this.message="";
  }
  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra định dạng email
    return emailRegex.test(email);
  }
}

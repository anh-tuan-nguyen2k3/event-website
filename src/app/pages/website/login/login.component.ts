import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { USERS } from '../../../../data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header2Component } from '../../partials/header2/header2.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, FormsModule, CommonModule, Header2Component],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  login() {
     // Kiểm tra định dạng email
     if (!this.isEmailValid(this.email)) {
      this.message = 'Email không đúng định dạng!';
      return; // Dừng xử lý nếu email sai định dạng
    }
    // Tìm kiếm người dùng với email và mật khẩu khớp
    const user = USERS.find(u => u.email === this.email && u.password === this.password);

    if (user) {
      // this.message = 'Đăng nhập thành công!';
      console.log('User Info:', user);

      // Lưu trạng thái đăng nhập (giả lập với LocalStorage)
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Điều hướng đến trang chủ hoặc trang khác
      window.location.href = '/home'; // Thay bằng route phù hợp
    } else {
      this.message = 'Email hoặc mật khẩu không chính xác!';
      console.log(this.message)
    }
  }

  resetMessage () {
    this.message="";
  }
  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra định dạng email
    return emailRegex.test(email);
  }
}

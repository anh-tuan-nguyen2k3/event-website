// header.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false; // Biến trạng thái cho menu
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoginIn.subscribe((status) => {
      console.log(status)
      this.isLoggedIn = status;
    });
  }

  // Phương thức xử lý sự kiện nhấp vào biểu tượng menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái của menu
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  // onProfileClick() {
  //   this.router.navigate(['/home']); // Điều hướng đến trang thông tin cá nhân
  // }

  onLogout() {
    // Xóa trạng thái đăng nhập và điều hướng về trang chủ
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}

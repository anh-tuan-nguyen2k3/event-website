// header.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css'],
  
})
export class Header2Component implements OnInit {
  isMenuOpen: boolean = false; // Biến trạng thái cho menu
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.isLoggedIn = true;
    }
  }

  // Phương thức xử lý sự kiện nhấp vào biểu tượng menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái của menu
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onProfileClick() {
    this.router.navigate(['/home']); // Điều hướng đến trang thông tin cá nhân
  }

  onLogout() {
    // Xóa trạng thái đăng nhập và điều hướng về trang chủ
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}

// header.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false; // Biến trạng thái cho menu
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
  searchTerm: string = ''; // To bind with the input field

  

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
  navigateBasedOnRole() {
    const token = this.authService.getToken(); // Giả sử bạn có phương thức này để lấy token
    if (token) {
      const role_id: number | null = this.authService.decodeToken(token).scope;
      if (role_id === 1) {
        this.router.navigateByUrl('/admin');
      } else if (role_id === 2) {
        this.router.navigateByUrl('/associateinfo');
      } else if (role_id === 3) {
        this.router.navigateByUrl('/personalinfo');
      }
    }
  }

  onSearchSubmit(): void {
    console.log('Search term:', this.searchTerm);
    // Implement logic here, e.g., filtering a list, API call, etc.
    window.location.href=`/events?search=${this.searchTerm}`;
  }
}

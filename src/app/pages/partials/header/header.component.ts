import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {
    
  }

  isMenuOpen: boolean = false; // Biến trạng thái cho menu

  // Phương thức xử lý sự kiện nhấp vào biểu tượng menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái của menu
  }

  onLoginClick() {
    this.router.navigate(['/login'])
  }
}

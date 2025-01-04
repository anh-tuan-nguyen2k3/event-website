import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
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

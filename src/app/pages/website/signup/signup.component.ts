import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User2Service } from '../../../services/user2.service';
import { CommonModule } from '@angular/common';

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
  onSubmit() {
    if(this.password != this.passwordCheck){
      this.message="Mật khẩu không trùng khớp!";
    }else{
      const data = {
        email: this.email,
        username: this.username,
        password: this.password,
      }
      this.userService.register(data).subscribe(
        (res)=> {
          window.location.href='/home';
        }
      );
    }  
  }
}

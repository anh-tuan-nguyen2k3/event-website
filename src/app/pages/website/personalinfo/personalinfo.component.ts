import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { APPEVENTS } from '../../../../data';
import { AppEvent } from '../../../services/event.service';

@Component({
  selector: 'app-personalinfo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './personalinfo.component.html',
  styleUrl: './personalinfo.component.css'
})
export class PersonalinfoComponent implements AfterViewInit{
  selectedTab: string = 'personal-info';
  isLoggedIn: boolean = false; // Kiểm tra người dùng đã đăng nhập chưa
  appEvents: AppEvent[] = [];

  ngAfterViewInit(): void {
   this.initdata();
  }

  selectTab(tab: string, event: Event) {
    event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
    this.selectedTab = tab; // Cập nhật tab được chọn
    this.initdata();
    console.log(`Tab được chọn: ${tab}`);
  }
  test: any;
  user: any;
  initdata() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser); // Chuyển đổi từ chuỗi JSON sang đối tượng
      this.test = JSON.parse(loggedInUser); // Chuyển đổi từ chuỗi JSON sang đối tượng
      this.isLoggedIn = true;

      console.log(this.user, 123)
      }
      this.loadEvents();
  }
  loadEvents() {
    this.appEvents = APPEVENTS;
  }

}

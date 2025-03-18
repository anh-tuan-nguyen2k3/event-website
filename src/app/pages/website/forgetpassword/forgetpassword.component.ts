import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { FormsModule } from '@angular/forms';
import { User2Service } from '../../../services/user2.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: any;

  constructor(private userService: User2Service){}

  sendMail(): void {
    console.log('Verification code sent to:', this.email);
    if(this.email !== null){
      this.userService.forgetPassword(this.email).subscribe(
        (res) => {
          if(res.code === 1000)
            alert(res.message);
        }
      )
    }
    
  }
}

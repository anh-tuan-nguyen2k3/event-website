import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

}

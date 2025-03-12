import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Event2Service } from '../../../services/event2.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  
  selectedUnit: string = ''; // Lưu giá trị đơn vị được chọn
  organizationUnits = ['DV1', 'DV2', 'DV3'];
  appEvents: any;

  constructor (private eventService: Event2Service) {};
  ngOnInit(): void {
    this.eventService.getAllEventsByStatus("APPROVE").subscribe(
      (res) => {
          console.log(res.result);
          this.appEvents = res.result;
      }
    )
  }
}

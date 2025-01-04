import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],

})
export class ButtonComponent implements OnInit{
  @Input() text: string = 'Button'; // Văn bản hiển thị trên nút
  @Input() color: string = '#F05A22'; // Màu nền mặc định
  @Input() textColor: string = '#fff'; // Màu chữ mặc định
  @Input() hoverColor: string = '#0056b3'; // Màu nền khi hover
  @Output() buttonClick = new EventEmitter<void>(); // Sự kiện khi nhấn nút
  

  originalColor: string = ''; // Lưu trữ màu nền ban đầu

  ngOnInit(): void {
    this.originalColor = this.color;
  }

  // constructor() {
  //   this.originalColor = this.color; // Gán màu nền ban đầu
  // }

  onMouseOver() {
    this.color = this.hoverColor; // Thay đổi màu khi hover
  }

  // Xử lý khi bỏ hover
  onMouseOut() {
    this.color = this.originalColor; // Trở về màu ban đầu
  }


  onClick() {
    this.buttonClick.emit(); // Phát sự kiện ra ngoài
  }
}

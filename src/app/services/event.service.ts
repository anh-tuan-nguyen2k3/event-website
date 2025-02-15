export class AppEvent {
    eventID: number; // ID duy nhất của sự kiện
    title: string; // Tiêu đề của sự kiện
    description: string; // Mô tả chi tiết về sự kiện
    startDate: Date; // Ngày bắt đầu sự kiện
    endDate: Date; // Ngày kết thúc sự kiện
    status: 'Pending' | 'Approved' | 'Rejected'; // Trạng thái duyệt sự kiện
    createdBy: number; // ID người tạo sự kiện
    totalSeats: number; // Tổng số lượng chỗ ngồi
    availableSeats: number; // Số lượng chỗ ngồi còn lại
    isFeatured: boolean; // Đánh dấu sự kiện nổi bật (true/false)
    createdAt: Date; // Thời gian tạo sự kiện
    imageUrl: string;
    bannerUrl: string;
    location: string;
    participants: string[];
  
    constructor(
      eventID: number,
      title: string,
      description: string,
      startDate: Date,
      endDate: Date,
      status: 'Pending' | 'Approved' | 'Rejected',
      createdBy: number,
      totalSeats: number,
      availableSeats: number,
      isFeatured: boolean,
      createdAt: Date,
      imageUrl: string,
      bannerUrl: string,
      location: string,
      participants: string[] = []

    ) {
      this.eventID = eventID;
      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
      this.createdBy = createdBy;
      this.totalSeats = totalSeats;
      this.availableSeats = availableSeats;
      this.isFeatured = isFeatured;
      this.createdAt = createdAt;
      this.imageUrl=imageUrl;
      this.bannerUrl=bannerUrl;
      this.location= location;
      this.participants = participants

    } 
  }
  
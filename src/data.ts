import { User } from "./app/services/user.service";
import { AppEvent } from "./app/services/event.service"; 

export const USERS: User[] = [
    {
        email: "tuanna21411@st.uel.edu.vn",
        password: "anhtuan716",
        name: "Nguyen Anh Tuan",
        isAdmin: false,
        phone: "0123456789",
        token: '',
        idnumber:'1',
        regisEvent: ['1','4']
    },
    {
        email: "admin@st.uel.edu.vn",
        password: "anhtuan716",
        name: "Nguyen Anh Tuan",
        isAdmin: true,
        phone: "0123456789",
        token: '',
        idnumber:'2',
        regisEvent: []
    }  

]
export const APPEVENTS: AppEvent[] = [
    {
      eventID: 1,
      title: "CUỘC THI SAP ERPSIM STUDENT COMPETITION 2024 - VIETNAM | BEYOND THE FUTURE",
      description: "Một cuộc thi dành cho sinh viên về quản lý ERP.",
      startDate: new Date("2024-11-16T07:30:00"),
      endDate: new Date("2024-11-16T12:00:00"),
      status: "APPROVE", // Hoặc "Pending", "Rejected"
      createdBy: 101, // ID người tạo
      totalSeats: 200, // Tổng số lượng chỗ ngồi
      availableSeats: 50, // Số lượng chỗ ngồi còn lại
      isFeatured: true, // Sự kiện nổi bật
      createdAt: new Date("2024-10-01T09:00:00"),
      imageUrl: "/assets/images/events/event-erp.jpg",
      bannerUrl: "/assets/images/events/event-erp.jpg",
      location: "Hội trường A",
      participants: ['1']
    },
    {
      eventID: 2,
      title: "CHƯƠNG TRÌNH HỘI NGHỊ KHOA HỌC 2024",
      description: `Hội nghị về những tiến bộ khoa học kỹ thuật là sự kiện quan trọng nhằm cập nhật, thảo luận và chia sẻ những thành tựu mới nhất trong lĩnh vực khoa học và công nghệ. Đây là dịp để các nhà khoa học, chuyên gia, nhà nghiên cứu và doanh nghiệp gặp gỡ, trao đổi ý tưởng, cũng như tìm kiếm cơ hội hợp tác phát triển.

Tại hội nghị, nhiều công trình nghiên cứu tiên tiến được giới thiệu, từ trí tuệ nhân tạo, công nghệ sinh học, vật liệu mới đến năng lượng tái tạo và tự động hóa. Các báo cáo khoa học không chỉ trình bày những khám phá mới mà còn phân tích tác động của chúng đối với xã hội, kinh tế và môi trường. Điều này giúp các tổ chức, doanh nghiệp có cái nhìn rõ hơn về xu hướng công nghệ, từ đó đưa ra chiến lược ứng dụng phù hợp.

Ngoài ra, hội nghị còn tạo ra diễn đàn để các chuyên gia thảo luận về những thách thức hiện nay như bảo mật dữ liệu, biến đổi khí hậu hay phát triển bền vững. Việc kết nối giữa các nhà nghiên cứu với doanh nghiệp cũng thúc đẩy quá trình thương mại hóa công nghệ, đưa các phát minh từ phòng thí nghiệm vào thực tiễn cuộc sống.

Nhìn chung, hội nghị về những tiến bộ khoa học kỹ thuật không chỉ góp phần thúc đẩy sự phát triển của khoa học mà còn tạo điều kiện để công nghệ phục vụ tốt hơn cho đời sống con người. Đây là nền tảng quan trọng giúp xã hội tiến xa hơn trong kỷ nguyên số hóa và đổi mới sáng tạo.`,
      startDate: new Date("2024-12-10T09:00:00"),
      endDate: new Date("2024-12-10T17:00:00"),
      status: "Pending",
      createdBy: 102,
      totalSeats: 300,
      availableSeats: 120,
      isFeatured: false,
      createdAt: new Date("2024-11-01T10:00:00"),
      imageUrl: "/assets/images/events/event-erp.jpg",
      bannerUrl: "/assets/images/events/event-erp.jpg",
      location: "Hội trường A",
      participants: ['']
    },
    {
      eventID: 3,
      title: "CHƯƠNG TRÌNH HỘI NGHỊ KHOA HỌC 2024",
      description: "Hội nghị về những tiến bộ khoa học kỹ thuật.",
      startDate: new Date("2024-12-10T09:00:00"),
      endDate: new Date("2024-12-10T17:00:00"),
      status: "Pending",
      createdBy: 102,
      totalSeats: 300,
      availableSeats: 120,
      isFeatured: false,
      createdAt: new Date("2024-11-01T10:00:00"),
      imageUrl: "/assets/images/events/event-erp.jpg",
      bannerUrl: "/assets/images/events/event-erp.jpg",
      location: "Hội trường A",
      participants: ['']
    },
    {
      eventID: 4,
      title: "CHƯƠNG TRÌNH HỘI NGHỊ KHOA HỌC 2024-4",
      description: "Hội nghị về những tiến bộ khoa học kỹ thuật.",
      startDate: new Date("2024-12-10T09:00:00"),
      endDate: new Date("2024-12-10T17:00:00"),
      status: "APPROVE",
      createdBy: 102,
      totalSeats: 300,
      availableSeats: 120,
      isFeatured: false,
      createdAt: new Date("2024-11-01T10:00:00"),
      imageUrl: "/assets/images/events/event-erp.jpg",
      bannerUrl: "/assets/images/events/event-erp.jpg",
      location: "Hội trường A",
      participants: ['1','2']
    },
  ];


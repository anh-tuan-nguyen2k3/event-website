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
        idnumber:''
    },
    {
        email: "admin@st.uel.edu.vn",
        password: "anhtuan716",
        name: "Nguyen Anh Tuan",
        isAdmin: true,
        phone: "0123456789",
        token: '',
        idnumber:''
    }

]
export const APPEVENTS: AppEvent[] = [
    {
      eventID: 1,
      title: "CUỘC THI SAP ERPSIM STUDENT COMPETITION 2024 - VIETNAM | BEYOND THE FUTURE",
      description: "Một cuộc thi dành cho sinh viên về quản lý ERP.",
      startDate: new Date("2024-11-16T07:30:00"),
      endDate: new Date("2024-11-16T12:00:00"),
      status: "Approved", // Hoặc "Pending", "Rejected"
      createdBy: 101, // ID người tạo
      totalSeats: 200, // Tổng số lượng chỗ ngồi
      availableSeats: 50, // Số lượng chỗ ngồi còn lại
      isFeatured: true, // Sự kiện nổi bật
      createdAt: new Date("2024-10-01T09:00:00"),
      imageUrl: "/assets/images/events/event-erp.jpg"
    },
    {
      eventID: 2,
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
    },
  ];


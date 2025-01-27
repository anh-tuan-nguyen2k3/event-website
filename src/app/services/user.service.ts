export class User {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  phone: string;
  token: string;
  idnumber: string;
  regisEvent: string[]; // Danh sách event ID

  constructor(
    email: string,
    password: string,
    name: string,
    isAdmin: boolean,
    phone: string,
    idnumber: string,
    token: string,
    regisEvent: string[] = [] // Mặc định là mảng rỗng nếu không truyền vào
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.isAdmin = isAdmin;
    this.phone = phone;
    this.idnumber = idnumber;
    this.token = token;
    this.regisEvent = regisEvent;
  }
  }
  
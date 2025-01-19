export class User {
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
    phone: string;
    token: string;
    idnumber: string;
  
    constructor(
      email: string,
      password: string,
      name: string,
      isAdmin: boolean,
      phone: string,
      idnumber: string,
      token: string
    ) {
      this.email = email;
      this.password = password;
      this.name = name;
      this.isAdmin = isAdmin;
      this.phone = phone;
      this.idnumber = idnumber;
      this.token = token;
    }
  }
  
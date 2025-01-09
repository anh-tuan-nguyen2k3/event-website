export class User {
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
    phone: string;
    token: string;
  
    constructor(
      email: string,
      password: string,
      name: string,
      isAdmin: boolean,
      phone: string,
      token: string = ''
    ) {
      this.email = email;
      this.password = password;
      this.name = name;
      this.isAdmin = isAdmin;
      this.phone = phone;
      this.token = token;
    }
  }
  
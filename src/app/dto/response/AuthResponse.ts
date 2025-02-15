export class AuthResponse{
    token: string;
    success: boolean

    constructor(token: string, success: boolean){
        this.token = token;
        this.success = success;
    }
}
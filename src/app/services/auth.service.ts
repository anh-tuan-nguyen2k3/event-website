
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse } from "../dto/response/ApiResponse";
import { AuthResponse } from "../dto/response/AuthResponse";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginStatus = new BehaviorSubject<boolean>(this.isLogin());
    private url : string = "http://localhost:8080/eventapp-service/auth";

    private jwtHelper = new JwtHelperService();

    constructor(private httpClient: HttpClient){}

    isLogin(): boolean{
        return !!localStorage.getItem("token");
    }

    get isLoginIn() {
        return this.loginStatus.asObservable(); 
    }

    getToken(p0: string): string | null{
        return localStorage.getItem("token")
      }
    
    setToken(token: string){
          localStorage.setItem("token", token);
    }

    getUserId() :any{
        const token = localStorage.getItem("token");
        if(token !== null)
            return this.jwtHelper.decodeToken(token).uid;
        else 
            return null;
    }

    getRoleId() :any{
        const token = localStorage.getItem("token");
        if(token !== null)
            return this.jwtHelper.decodeToken(token).scope;
        else 
            return null;
    }

    decodeToken(token: string): any{
        return this.jwtHelper.decodeToken(token);
    }

    introspect(token: string): Observable<boolean>{
        return this.httpClient.post<ApiResponse<any>>(`${this.url}/introspect`, {token: token}).pipe(
            map((res: any) => {
                console.log(res)
                if(res.result !== null)
                return res.result.verify;
            })
        )
    }

    authenticate(req: any): Observable<any> {
        return this.httpClient.post<ApiResponse<AuthResponse>>(this.url, req).pipe(
            map((res: ApiResponse<AuthResponse>) => {
                if(res.result !== null){
                    this.loginStatus.next(true);
                    this.setToken(res.result.token);
                }
                return res;
            })
        )
    }

    logout(){
        this.loginStatus.next(false);
        localStorage.clear();
    }
  }
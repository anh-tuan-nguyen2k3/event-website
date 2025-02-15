
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse } from "../dto/response/ApiResponse";
import { AuthResponse } from "../dto/response/AuthResponse";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url : string = "http://localhost:8080/eventapp-service/auth";

    private jwtHelper = new JwtHelperService();

    constructor(private httpClient: HttpClient){}

    getToken(): string | null{
        return localStorage.getItem("token")
      }
    
    setToken(token: string){
          localStorage.setItem("token", token);
    }

    decodeToken(token: string): any{
        return this.jwtHelper.decodeToken(token);
    }

    getRoleFromToken(): number | null {
        const token = this.getToken();
         if (token) {
            const decodedToken = this.decodeToken(token);
           return decodedToken.scope;
         }
         return null;
     }

    authenticate(req: any): Observable<any> {
        return this.httpClient.post<ApiResponse<AuthResponse>>(this.url, req).pipe(
            map((res: ApiResponse<AuthResponse>) => {
                return res;
            })
        )
    }

  }
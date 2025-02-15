
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

    getToken(p0: string): string | null{
        return localStorage.getItem("token")
      }
    
    setToken(token: string){
          localStorage.setItem("token", token);
    }

    decodeToken(token: string): any{
        return this.jwtHelper.decodeToken(token);
    }



    authenticate(req: any): Observable<any> {
        return this.httpClient.post<ApiResponse<AuthResponse>>(this.url, req).pipe(
            map((res: ApiResponse<AuthResponse>) => {
                if(res.result !== null)
                    this.setToken(res.result.token);
                return res;
            })
        )
    }

  }
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto/response/ApiResponse";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private url : string = "http://localhost:8080/eventapp-service/categories";

     constructor(private httpClient: HttpClient, private authService: AuthService){}

     getAllEvents(): Observable<ApiResponse<any>>{
        return this.httpClient.get<ApiResponse<any>>(this.url).pipe(
           map((res: ApiResponse<any>) => {
              return res; 
          })
        )
    }
}
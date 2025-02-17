import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto/response/ApiResponse";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class Event2Service {
    private url : string = "http://localhost:8080/eventapp-service/events/id/1";

     constructor(private httpClient: HttpClient, private authService: AuthService){}

    getAllEvents(): Observable<ApiResponse<any>>{
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${localStorage.getItem("token")}`)
      }

      return this.httpClient.get<ApiResponse<any>>(this.url, header).pipe(
         map((res: ApiResponse<any>) => {
            return res; 
        })
      )
    }    
}
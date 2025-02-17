import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto/response/ApiResponse";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class Event2Service {
    private url : string = "http://localhost:8080/eventapp-service/events";

     constructor(private httpClient: HttpClient, private authService: AuthService){}

    getAllEvents(): Observable<ApiResponse<any>>{
      return this.httpClient.get<ApiResponse<any>>(this.url).pipe(
         map((res: ApiResponse<any>) => {
            return res; 
        })
      )
    }

    getAllEventsByStatus(status: string): Observable<ApiResponse<any>>{
      return this.httpClient.get<ApiResponse<any>>(`${this.url}/${status}`).pipe(
         map((res: ApiResponse<any>) => {
            return res; 
        })
      )
    }

    getEventById(id: number): Observable<ApiResponse<any>>{
      return this.httpClient.get<ApiResponse<any>>(`${this.url}/id/{${id}}`).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }
}
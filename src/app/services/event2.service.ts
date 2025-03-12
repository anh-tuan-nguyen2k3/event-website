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
      return this.httpClient.get<ApiResponse<any>>(`${this.url}?status=${status}`).pipe(
         map((res: ApiResponse<any>) => {
            return res; 
        })
      )
    }

    getEventById(id: number): Observable<ApiResponse<any>>{
      return this.httpClient.get<ApiResponse<any>>(`${this.url}/id/${id}`).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }

    save(data: any): Observable<ApiResponse<any>>{
      return this.httpClient.post<ApiResponse<any>>(`${this.url}`, data).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }

    updateStatus(id: number, status: string): Observable<ApiResponse<any>>{
      return this.httpClient.post<ApiResponse<any>>(`${this.url}/status?id=${id}&status=${status}`, null).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }
    
    filter(sql: string): Observable<ApiResponse<any>>{
      return this.httpClient.get<ApiResponse<any>>(sql).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }
}
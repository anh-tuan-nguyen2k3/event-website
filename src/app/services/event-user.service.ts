import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto/response/ApiResponse";
import { HttpClient } from "@angular/common/http";



@Injectable({
    providedIn: 'root'
})
export class EventUserService {
    private url : string = "http://localhost:8080/eventapp-service/event-user";

    constructor(private httpClient: HttpClient){}
    
    reisterEvent(data: any): Observable<ApiResponse<any>>{
          return this.httpClient.post<ApiResponse<any>>(`${this.url}`, data).pipe(
            map((res: ApiResponse<any>) => {
               return res; 
           })
         )
        }

    getUserByEvent(id: number): Observable<ApiResponse<any>>{
            return this.httpClient.get<ApiResponse<any>>(`${this.url}/${id}` ).pipe(
              map((res: ApiResponse<any>) => {
                 return res; 
             })
           )
          }
    
}
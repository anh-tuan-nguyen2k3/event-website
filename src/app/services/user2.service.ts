import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto/response/ApiResponse";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class User2Service {
    private url : string = "http://localhost:8080/eventapp-service/users";

     constructor(private httpClient: HttpClient, private authService: AuthService){

     }

     forgetPassword(email: string): Observable<ApiResponse<any>>{
      return this.httpClient.get<ApiResponse<any>>(`${this.url}/reset?email=${email}`).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }

    updateFaculty(id: number, data: any){
      return this.httpClient.put<ApiResponse<any>>(`${this.url}/faculty/${id}`, data).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }

     //update user
    updateAccount(id: number, data: any): Observable<ApiResponse<any>>{
        return this.httpClient.put<ApiResponse<any>>(`${this.url}/${id}`, data).pipe(
          map((res: ApiResponse<any>) => {
             return res; 
         })
       )
      }

    getUserbyId(id: number): Observable<ApiResponse<any>>{
        return this.httpClient.get<ApiResponse<any>>(`${this.url}/${id}`).pipe(
          map((res: ApiResponse<any>) => {
             return res; 
         })
       )
    }

    register(data: any){
      return this.httpClient.post<ApiResponse<any>>(`${this.url}`, data).pipe(
        map((res: ApiResponse<any>) => {
           return res; 
       })
     )
    }

    saveFaculty(data: any): Observable<ApiResponse<any>>{
      //fix
      return this.httpClient.post<ApiResponse<any>>(`${this.url}/faculty`, data).pipe(
         map((res: ApiResponse<any>) => {
            return res; 
        })
      )
    }
}
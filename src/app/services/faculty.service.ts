import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto/response/ApiResponse";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class FacultyService {
    private url : string = "http://localhost:8080/eventapp-service/users/role";

    constructor(private httpClient: HttpClient, private authService: AuthService){}

    getAllFaculty(): Observable<ApiResponse<any>>{
        //fix
        return this.httpClient.get<ApiResponse<any>>(`${this.url}/ASSOCIATE`).pipe(
           map((res: ApiResponse<any>) => {
              return res; 
          })
        )
      }
}
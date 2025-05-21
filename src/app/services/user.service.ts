import  { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRegister, type LoginModel } from "../model/user.model";
import type { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UserService{

    constructor(private http: HttpClient){}
      
    registerUser(obj:UserRegister):Observable<UserRegister>{
            return this.http.post<UserRegister>("https://api.freeprojectapi.com/api/UserApp/CreateNewUser",obj);
        }
    
    onLogin(obj:LoginModel): Observable<UserRegister>{
        return this.http.post<UserRegister>("https://api.freeprojectapi.com/api/UserApp/login",obj);
    }
}
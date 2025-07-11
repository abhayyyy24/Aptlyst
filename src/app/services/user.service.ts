import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core';
import type { UserRegister } from "../model/user.model";

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http:HttpClient){}

    registerUser(obj:UserRegister){
        return this.http.post("POST http://localhost:5000/api/auth/signup",obj)
    }
}
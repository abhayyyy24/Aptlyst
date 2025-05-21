import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel, UserRegister } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-screen',
  imports: [FormsModule,CommonModule],
  templateUrl: './auth-screen.component.html',
  styleUrl: './auth-screen.component.css'
})
export class AuthScreenComponent {
   isLogin = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  registerObj:UserRegister=new UserRegister();
  loginObj:LoginModel=new LoginModel();
  userService=inject(UserService);
  router=inject(Router)
  onRegister(){
    this.userService.registerUser(this.registerObj).subscribe((res:UserRegister)=>{
      alert("User Registration Succesfull")
    },error=>{
      alert(error.error)
    })
  }

  onLogin(){
    this.userService.onLogin(this.loginObj).subscribe((res:UserRegister)=>{
      alert("User Login Succesfull")
      this.router.navigateByUrl('/dscreen')
    },error=>{
      alert(error.error)
    })
  }
}

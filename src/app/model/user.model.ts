export class UserRegister{
    FullName:string;
    PhoneNumber:number;
    emailId:string;
    password:string;

    constructor(){
        this.FullName='';
        this.PhoneNumber=0;
        this.emailId='';
        this.password=''
    }
}

export class LoginModel{
    emailId:string;
    password:string;

    constructor(){
        this.emailId='';
        this.password=''
    }
}
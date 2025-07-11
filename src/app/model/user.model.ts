export class UserRegister{
    name:string;
    phone:number;
    email:string;
    password:string;

    constructor(){
        this.name='';
        this.phone=0;
        this.email='';
        this.password=''
    }
}

export class LoginModel{
    email:string;
    password:string;

    constructor(){
        this.email='';
        this.password=''
    }
}
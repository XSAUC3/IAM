import {Applications,application,addApp,updateApp,delApp} from '../../routeConfig';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  email : String;

  path : String;

  rsp : Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

    onLoginSubmit() {
      const user = {
        username: this.username,
        password: this.password
      }

      this.authService.authenticateUser(user).subscribe(data => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
    
          this.router.navigate(['dashboard']);
        } else {
          //Toast
          this.toastr.error(data.msg);
          this.router.navigate(['login']);
        }
    });
  }

  // Forgot Password
  ForgotPassword = () => {
    let Email_Id = this.email;

    if (Email_Id == (undefined || null)) {
          this.toastr.error('Please Provide All The Necessary Fields.');
    } else {
      const email = {
        mail: Email_Id
      }

      this.authService.forgotPassword(email).subscribe(data => {
        if(data.success) {
          //Toast
          this.toastr.success('Mail is being sent Successfully to your Email.');
        } else {
          //Toast
          this.toastr.error(data.msg);
        }
    });

       this.email = "";
    };
  }

  url : String;
  uid : String;
  change_password : String;
  change_repassword : String;

  onChangePassword(){
    if(this.change_password === this.change_repassword){
      let dt = {
        id : this.uid,
        password : this.change_password
      }
      this.authService.changePassword(dt).subscribe(data => {
        if(data.success) {
          //Toast
          this.toastr.success('Password has been changed successfully..!');
          this.rsp = false;
          this.router.navigate(['/']);
        } else {
          //Toast
          this.toastr.error('Something went Wrong..!');
          this.router.navigate(['/']);
        }
    });
    }
  }

  

  ngOnInit() {
    let url = window.location.href;
    
    if(url != 'http://localhost:4200/'){
      let para = url.split('$')[1];
      let id = para.split('&')[0];
      let token = para.split('&')[1];
      
      this.authService.checkToken(id, token).subscribe(data => {
        if(data.success == false) {
          this.toastr.error('Link is Incorrect or is being expired..!');
        }
        else{
          this.rsp = true;
          this.uid = id;
        }
      });
    }
  }

}

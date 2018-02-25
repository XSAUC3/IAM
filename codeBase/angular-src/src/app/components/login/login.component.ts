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
          //Toast
          this.toastr.success('You are now logged in Successfully.');
          //this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['dashboard']);
        } else {
          //Toast
          this.toastr.error(data.msg);
          //this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['login']);
        }
    });
  }

  ngOnInit() {
  }

}

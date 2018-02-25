import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

    onLogoutClick() {
      this.authService.logout();
      //Toast
      this.toastr.success('You are now logged Out Successfully.');
      //this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
      return false;
    }
    
  ngOnInit() {
  }

}

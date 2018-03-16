import {Applications,application,addApp,updateApp,delApp} from '../../routeConfig';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  applications = [];

  selected_id = "";
constructor(private authService: AuthService,private router: Router,private toastr: ToastrService,private http:Http) {
   
    console.log("SID :" + sessionStorage.getItem('app_id'));
    this.router.events.subscribe(()=>{
      this.fetchApplication();
    })
   }

  onLogoutClick() {
    sessionStorage.clear();
    this.authService.logout();
    //Toast
    //this.toastr.success('You are now logged Out Successfully.');
    //this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

  getAppId() {
    console.log(this.selected_id);
    sessionStorage.setItem('app_id',this.selected_id);
   window.location.reload();
    console.log("session id: " + sessionStorage.getItem('app_id'));

    //this.router.navigate(['appRoot']);


    
  }

  se_app_id = sessionStorage.getItem('app_id');

// Fetch Application
fetchApplication=function() {
this.http.get(Applications).subscribe(
  (res: Response) => {
    this.applications = res.json();
    console.log(this.applications);
   
  }
)
}
  
ngOnInit() {
  if(this.se_app_id!=null) {
    this.selected_id=this.se_app_id;
  }

  this.fetchApplication();
}

  hnu(){
    console.log("hi");
    var x = document.getElementById('sidebar');
    if(x.style.display === 'none') x.style.display = 'block';
    else x.style.display = 'none';

    var mp = document.getElementById('main-panel');
    if(mp.className === 'main-panel') mp.className = 'panel' ;
    else mp.className = 'main-panel' ;
  }

}

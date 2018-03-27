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
    this.router.events.subscribe(()=>{
      this.fetchApplication();
    })
   }

   collapse(){
     if(document.body.className == 'sidebar-mini'){
      document.body.className = '';
     }
     else{
      document.body.className = 'sidebar-mini';
     }
   }

   toggleFullScreen() {

    var x = document.getElementById("fsi");
    if (x.innerHTML === "fullscreen") {
      x.innerHTML = "fullscreen_exit";
    } else {
      x.innerHTML = "fullscreen";
    }

    if ((document.fullscreenElement && document.fullscreenElement !== null) ||    
     (!document.fullscreenElement && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullscreen) {  
        document.documentElement.requestFullscreen();  
      } else if (document.documentElement.requestFullscreen) {  
        document.documentElement.requestFullscreen();  
      } else if (document.documentElement.webkitRequestFullScreen) {  
        document.documentElement.webkitRequestFullScreen();  
      }  
    } else {  
      if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
      }  
    }  
  }

  onLogoutClick() {
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

  getAppId() {
 
  sessionStorage.setItem('app_id',this.selected_id);
  sessionStorage.setItem('componentVisibility','true')
  var currentLocation = window.location.pathname;
    this.router.navigate(['']);
  }

  se_app_id = sessionStorage.getItem('app_id');

// Fetch Application
fetchApplication=function() {
this.http.get(Applications).subscribe(
  (res: Response) => {
    this.applications = res.json();
   
  }
)
}
  
ngOnInit() {
  if(this.se_app_id!=null) {
    this.selected_id=this.se_app_id;
  }

  this.fetchApplication();
}
}

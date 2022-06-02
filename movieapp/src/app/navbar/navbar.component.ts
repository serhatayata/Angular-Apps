import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      //NULL ISE FALSE DONER !! için
      this.isAuthenticated = !!user;
    }) 
  }

  onLogout(){
    this.authService.logout();
  }

}

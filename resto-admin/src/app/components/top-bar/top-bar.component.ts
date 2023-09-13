import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
  userName :string = '';
  userLogged : boolean = false;
  constructor (private userService: UserService, private router:Router, private cookies :CookieService) {
    
  }
  ngOnInit(): void {
      this.router.events.subscribe (()=> {
          const token = this.userService.getToken()
          this.userService.getUser(token).subscribe (
            res=>{
              this.userName = JSON.parse(JSON.stringify(res)).name
              console.log(this.userName)
              this.userLogged = true;
            },
            err => {
              this.userName = "";
              this.userLogged = false;
            }
          )
      }
      
      )
  }

  logOut () {
    this.cookies.delete("token");
    this.router.navigateByUrl('/')
  }
}

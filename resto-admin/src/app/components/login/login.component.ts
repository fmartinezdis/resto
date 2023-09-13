import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userForm = this.fb.group (
    {
      email: ['', Validators.required],
      password: ['',Validators.required]
    }
  )

  constructor (private fb :FormBuilder, private userService:UserService, private router: Router) {

  }

  ngOnInit(): void {

  }

  login() {
      const user = this.userForm.value;
      this.userService.login(user).subscribe (res=>{
          console.log("user authtenticated")
          this.userService.setToken(JSON.parse(JSON.stringify(res)).token)
          this.router.navigateByUrl('/');
      },
      err => {
        console.log(err)
        console.log("user not authtenticated")
      }
      )

  }
    
 }



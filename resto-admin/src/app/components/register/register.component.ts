
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   userForm = this.fb.group ({
      id: [''],
      name : ['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
  })

  constructor (private userService: UserService, private fb:FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
      
  }

  register() {
      this.userService.register(this.userForm.value).subscribe(
          res => { 
            Swal.fire({  
              position: 'center',  
              icon: 'success',  
              title: JSON.parse(JSON.stringify(res)).message,  
              showConfirmButton: false,  
              timer: 1500  
            })  
            this.userService.setToken(JSON.parse(JSON.stringify(res)).token)

          },
          err =>{
            Swal.fire({  
              position: 'center',  
              icon: 'error',  
              title: JSON.parse(JSON.stringify(err)).error.message,    
              showConfirmButton: false,  
              timer: 1500  
            })  
          }
      )
      this.userForm.reset();
      this.router.navigateByUrl('/')
  }


}

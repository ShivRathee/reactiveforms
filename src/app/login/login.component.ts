import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  form: FormGroup;
 
  constructor(private formbuilder:FormBuilder,private http: HttpClient, private router:Router) { }
 
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]],
    });
  }
  
  // onSubmit(data:any) {
  //   console.log(data);
  // }
 
  submitform(data) {
    console.log(data);
    this.http.post('http://deno-dev.herokuapp.com/service/authenticate',data)
    .subscribe(res=> {
      console.log('res->', res);
      localStorage.setItem('login',JSON.stringify(res));
      this.router.navigate(['/users']);
    })
  }
 
}
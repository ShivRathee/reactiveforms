import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!:FormGroup;
  constructor(private _fb: FormBuilder,private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      username:['',[Validators.required]]
    });
  }
  
  submitform(data:any){
    console.log(data);
    this.http.post('http://deno-dev.herokuapp.com/service/signup',data)
    .subscribe((res)=>{
      console.log('res->',res);
      this.router.navigate(['/login']);
    });
  }
}

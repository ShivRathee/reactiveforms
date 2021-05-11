import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;

  constructor(private formbuilder:FormBuilder, private http: HttpClient, private router:Router, private activateRoute: ActivatedRoute) 
    
   { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      
      number:['',[Validators.required]]
    });
    let user = localStorage.getItem('login');
    this.activateRoute.paramMap.subscribe((res)=>{
      console.log(res);
    const id=res.get('id')
    if(user){
      user = JSON.parse(user);
      console.log(user);
   
    }
  });
  }

  onSubmit(data:any) {
    console.log(data);
   // this.router.navigate(['/users']);
  }
 
  updateform(id) {
    console.log(id);
    let user = localStorage.getItem('login');
   
    const headers = new HttpHeaders().append(
      'Authorization',
      user['access_token']
    )
    
    
    this.http.put('http://deno-dev.herokuapp.com/service/users/'+id,{headers:headers})
    .subscribe((usr)=>{
    
      console.log(usr);

      
  });
   }
  }




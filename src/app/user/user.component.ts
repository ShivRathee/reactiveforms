import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userCollection = [];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let user = localStorage.getItem('login');
    
    if(user){
      user = JSON.parse(user);
      console.log(user);
      const headers = new HttpHeaders().append(
        'Authorization',
        user['access_token']
      )
      
      this.http.get('http://deno-dev.herokuapp.com/service/users',{headers:headers})
      .subscribe((res)=>{
        console.log(res);
        this.userCollection = res['data'];
    });
  }
  }
}

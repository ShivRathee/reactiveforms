import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  userCollection = [];
  user;
  routeParam: {id:string};
  constructor(
    private http:HttpClient,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe((res: ParamMap)=> {
      this.routeParam = {
        id: res.get('id'),
      };
    });
    this.user = localStorage.getItem('login');
    if(this.user) {
      this.user = JSON.parse(this.user);
    }
    this.userList();
  }

  getApiHeader() {
    const headers = new HttpHeaders();
    if(this.user['access_token']) {
      headers.append('Authorization',this.user['access_token']);
    }
    return headers;
  }

  userList(){
    if(this.user['access_token']){
      this.http.get('http://deno-dev.herokuapp.com/service/users',{
        headers: this.getApiHeader(),
      })
      .subscribe((res)=> {
        console.log(res);
        if(res){
          this.userCollection=res['data'];
        }
      });
    }
  }

  updateUser(data: any){
    if(this.user['access_token']) {
      this.http.put('http://deno-dev.herokuapp.com/service/users/' +this.routeParam.id,data,
      {
        headers: this.getApiHeader(),
      })
      .subscribe((res)=> {
        console.log('res->',res);
        
        this.router.navigate(['/users']);
      });
    }
  }

  deleteUser(id: string) {
    if(this.user['access_token']) {
      this.http.delete('http://deno-dev.herokuapp.com/service/users/'+id,{
        headers: this.getApiHeader(),
      })
      .subscribe((res)=> {
        console.log('res->',res);
        this.userList();
      });
    }
  }

 

  update(id: number){
    console.log(id);

    this.router.navigate(['/update/'+ id]);
  }
}
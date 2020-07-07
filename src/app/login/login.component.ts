import { Component, OnInit } from '@angular/core';
import{ HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private obj:HttpClient) { }

  ngOnInit(): void {
  }
  email:string="";
  pass:string="";
  serverData;
  msg:string;

  loginCheck()
  {
	  if( (this.email =="") || (this.pass=="") )
	  {
		  this.msg = "Invalid input !";
	  }else{
		  this.msg = "Please wait processing...";
		  var input = {"email":this.email, "password":this.pass};
		  var url = "https://www.firstenquiry.com/api/angular/auth.php";
		  this.obj.post(url, input).subscribe(response=>{
			  this.serverData = response as string[];
			  if(this.serverData.id==""){
				  this.msg = "Invalid or Not exists !";
			  }else{
				  sessionStorage.setItem("tokenno", this.serverData.id);
				  window.location.reload();
			  }
		  })
		  
	  }
  }

}

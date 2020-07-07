import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-dream-app';
  
  tokenno:string;
  login:boolean = false;
  constructor() {
 
   }

  ngOnInit(): void {
	 this.tokenno = sessionStorage.getItem("tokenno"); // fetching user id from sesion storage
	 if(this.tokenno !=null){
		this.login = true; 
	 }
  }

 
}


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  constructor(private obj:HttpClient) { }
  
  tokenno:string;
  ngOnInit(): void {
	  this.tokenno = sessionStorage.getItem("tokenno");
	  this.getcompany("Active");
	  this.getjob("Active");
  }
  
  blockName:string="new";
  enableBlock(input:string)
  {
	  this.blockName = input;
	  if(input !="new"){
		   this.getjob(input);
	  }
  }
  
  
	  allcompany:any[]=[];
	  getcompany(status:string="Active")
	  {
		  this.allcompany=[];// setting to empty
		  var url = "https://www.firstenquiry.com/api/angular/companylist.php";
		  var input = {
						"hrid":this.tokenno,
						"status":status
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.allcompany = response as string[];
		})
	  }
  
  title:string;
  jd:string;
  client:string;
  salary:string;
  exp:string;
  position:string;
  city:string;
  
  serverData;
  msg:string;
   save(){
	  var url = "https://www.firstenquiry.com/api/angular/savejob.php";
	  var input = {
					"title":this.title,
					"jd":this.jd,
					"client":this.client,
					"salary":this.salary,
					"exp":this.exp,
					"position":this.position,					
					"location":this.city,
					"hrid":this.tokenno
				  };
	this.obj.post(url, input).subscribe(response=>{
		this.serverData = response as string[];
		this.msg = this.serverData.status;
		this.title=""; this.jd=""; this.salary=""; this.exp=""; this.position=""; this.city="";
		this.getjob("Active");// to refresh the list after saving
	})
  }
  
  joblist:any[]=[];
  getjob(status:string="Active")
  {
		  this.joblist=[];// setting to empty
		  var url = "https://www.firstenquiry.com/api/angular/joblist.php";
		  var input = {
						"hrid":this.tokenno,
						"status":status
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.joblist = response as string[];
		})
  }

  updateStatus(status:string , id:number){
    var url = "https://www.firstenquiry.com/api/angular/changejobstatus.php";
		  var input = {
						"hrid":this.tokenno,
						"job":id,
						"status":status
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.serverData = response as string[];
			this.msg = this.serverData.status;
			this.getjob(this.blockName);// after update to reload the list
		})
  }

  keyword:string;
  p:number=1;
}

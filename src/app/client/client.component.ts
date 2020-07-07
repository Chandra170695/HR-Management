import { Component, OnInit } from '@angular/core';
import{ HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private obj:HttpClient) { }
  tokenno:string;
  
  ngOnInit(): void {
    this.tokenno = sessionStorage.getItem("tokenno");

    //this.getcompany(); // to load company list on component call
  }
  
  blockName:string="new";
  enableBlock(input:string)
  {
    this.blockName = input;
    if(input != "new"){
      this.getcompany(input);
    }else{
      this.msg="";
    }
   
  }
  company:string;
  contact:string;
  email:string;
  phone:string;
  mobile:string;
  city:string;
  address:string;
  msg:string;
  serverData;
  save(){
    var url = "https://www.firstenquiry.com/api/angular/savecompany.php";
    var input ={
                  "company":this.company,
                  "contact":this.contact,
                  "email":this.email,
                  "phone":this.phone,
                  "mobile":this.mobile,
                  "city":this.city,
                  "address":this.address,
                  "hrid":this.tokenno
                };
    this.obj.post(url, input).subscribe(response=>{
      this.serverData = response as string[];
      this.msg = this.serverData.status;
      this.company="";
      this.contact="";
      this.email="";
      this.phone="";
      this.mobile="";
      this.city="";
      this.address="";
      this.getcompany("Active"); //to refresh the list after saving;
    }) 
   }
   allcompany:any[]=[];
   getcompany(status:string="Active")
   {
     this.allcompany=[];
     this.msg="<i class='fa fa-spinner fa-spin text-primary'></i> Please wait....";
     var url = "https://www.firstenquiry.com/api/angular/companylist.php";
     var input = {
           "hrid":this.tokenno,
           "status":status
           };
   this.obj.post(url, input).subscribe(response=>{
     this.allcompany = response as string[];
     this.msg="";
   })
   }

   updateStatus(status:string , id:number){
    var url = "https://www.firstenquiry.com/api/angular/changecompanystatus.php";
		  var input = {
						"hrid":this.tokenno,
						"companyid":id,
						"status":status
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.serverData = response as string[];
			this.msg = this.serverData.status;
			this.getcompany(this.blockName);// after update to reload the list
		})
  }

keyword:string;
p:number=1;
}

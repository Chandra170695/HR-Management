import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private obj:HttpClient) { }
  tokenno:string;

  ngOnInit(): void {
	    this.tokenno = sessionStorage.getItem("tokenno");
		this.getcompany("Active");
  }
  
  blockName:string="new";
  enableBlock(input:string)
  {
	  this.blockName = input;
	  if(this.blockName !="new"){
		  this.getbill(this.billclient);
	  }
  }
  
  allcompany:any[]=[];
  getcompany(status:string="Active")
  {
	  var url = "https://www.firstenquiry.com/api/angular/companylist.php";
	  var input = {
					"hrid":this.tokenno,
					"status":status
				  };
	this.obj.post(url, input).subscribe(response=>{
		this.allcompany = response as string[];
	})
  }
  
  
  profileList:any[]=[];
  msg2:string;
  getprofile(clientid:string)
  {
	  this.msg2 = "Please wait..";
	  this.profileList=[];
	  var url = "https://www.firstenquiry.com/api/angular/userlist.php";
	  var input = {
					"hrid":this.tokenno,
					"clientid":clientid,
					"status":"Joined"
				  };
		this.obj.post(url, input).subscribe(response=>{
			this.profileList = response as string[];
			this.msg2= this.profileList.length + " Employee Found !";
		});
  }
  
  exp:string;
  ctc:number;
  ectc:number;
  amount:number;
  
  userid:number; 
  index:number;
  name:string;
  email:string;
  mobile:string;
  companyid:number;

  processdata(index:number){
	  this.index = index; // temp to global variable
	  this.userid = this.profileList[index].userid;
	  this.exp = this.profileList[index].exp;
	  this.name = this.profileList[index].firstname + this.profileList[index].lastname;
	  this.email = this.profileList[index].email;
	  this.mobile = this.profileList[index].phone;
	  
	  this.ctc = parseInt(this.profileList[index].ctc);
	  this.ectc = parseInt(this.profileList[index].ectc);
	  this.amount = this.ectc / 12;
  }
  
  changeprocess()
  {
	  this.amount = this.ectc / 12;
  }
  
 serverData;
  save()
	{
		var url = "https://www.firstenquiry.com/api/angular/savebill.php";
		  var input = {
						"hrid":this.tokenno,
						"userid":this.userid,
						"clientid":this.companyid,
						"oldctc":this.ctc,
						"ctc":this.ectc,
						"amount":this.amount,
						"name":this.name,
						"email":this.email,
						"mobile":this.mobile,
						"exp":this.exp
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.serverData = response as string[];
			this.msg2 = this.serverData.status;
		})
	}
  billclient:number;
  emplist:any[]=[];
  getbill(clientid:number)
  {
	  this.msg2 = "Please wait..";
	  this.emplist=[];
	  var url = "https://www.firstenquiry.com/api/angular/billinglist.php";
	  var input = {
					"hrid":this.tokenno,
					"clientid":clientid,
					"status":this.blockName
				  };
		this.obj.post(url, input).subscribe(response=>{
			this.emplist = response as string[];
			this.msg2= this.emplist.length + " invoice Found !";
		});
  }

}

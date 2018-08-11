import { Component, OnInit, Pipe} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Constants } from '../../components/constants/bconstants';
import { DecimalPipe } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
 
 Math: any;
 public transactions;
 public etherscanurl = Constants.EtherscanURL;
 public myAPI1: any;
 public extapi = Constants.extapi;


  constructor(private http: Http, private accountService: AccountService, private router: Router) {
       this.Math = Math;

       this.callTrans(this.extapi);
   }

  

  ngOnInit() {


  
 

  }

  public async callmyWallet(extapi): Promise<any> {
  console.log(extapi);

 return new Promise((resolve, reject) => {
 
  this.accountService.getWCdetails().subscribe(function(response){
    // access the value inside the `then`
    //console.log(response.waddr.walletaddr);
    console.log(response.contractdetails[0].caddr);
    this.caddr1 = response.contractdetails[0].caddr;
    this.waddr1 = response.waddr.walletaddr;
    this.myAPI = extapi+'/api?module=account&action=tokentx&contractaddress='+this.caddr1+'&address='+this.waddr1+'&page=1&offset=100&sort=asc&apikey=FEB8QKAEUA9T6I15X6RTMI4MRCN6RFHIQD';
    
     console.log(this.myAPI);

     resolve(this.myAPI); 
    });
    


  })as Promise<any>;
   
 }

gettransdetails(myAPI1,extapi){
console.log("pppppp");
 this.callmyWallet(extapi).then((myAPI1) => {this.myAPI1 = myAPI1; console.log(this.myAPI1); this.jumpret(this.myAPI1).subscribe(response => { this.transactions = response.result; console.log(this.transactions); }); } );

console.log(this.myAPI1);
console.log(this.transactions);
  }

 jumpret(a)
 {
 console.log(a);
 return this.http.get(a).map(res => res.json());
 }

callTrans(extapi){
 this.gettransdetails(this.myAPI1,extapi);
                    
 }

 
  
   

}

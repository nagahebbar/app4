import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef, Renderer, Directive, ViewChild, trigger, state, animate, transition, style, AfterViewInit} from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { Constants } from '../../components/constants/bconstants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
const utils = require('web3-utils');
var BigNumber = require('bignumber.js');
import { AccountService } from '../../services/account.service';

import { Router } from '@angular/router';
import { PRofile } from '../../interfaces/profile';
import { ICODetail } from '../../interfaces/icodetail';
import { WAddr } from '../../interfaces/walletaddr';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AbstractControl, FormsModule, FormGroup, FormArray, FormBuilder,
          Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
//import { customvalidate } from '../../services/customvalidate';

import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
//import * as Web3 from 'web3';
const Web3 = require('web3'); //tslint:disable-line
const Eth = require('ethjs');
import * as Tx from 'ethereumjs-tx';
// var Tx = require('ethereumjs-tx');
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { ContractDetail } from '../../interfaces/contractdetail';
import { DataService } from '../../services/data.service';

  declare var window: any;


 


  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
   

  })

  

  export class DashboardComponent implements OnInit{

  show: boolean = false;

  formtrans: FormGroup;
  formpurch: FormGroup;
  formapprov: FormGroup;
  formtranstft: FormGroup;

  myStatusExp = "something";
  user: PRofile;
  icodetail: ICODetail;
  waddr: WAddr;

  name = 'Initial name from component';
  NewName : string;
  //nameChange = contract(nameChangeArtifacts);

  mywaddr: string;
  yourwaddr: string;
  youramt: string;

  yourwaddrp: string;
  youramtp: any;

  yourwaddra: string;
  youramta: string;

  yourfromwaddrtft: string;
  yourtowaddrtft: string;
  youramttft: string;

  account: any;
  accounts: any;
  web3: any;
  status: string;
  public balance: any;
  
  public balanceo: any;
  public balanceme: any;
  public initialtotalsupply: any;
  contractdetails: ContractDetail;
    
  public caddr: string;
  public cabi;

  private net: any;

  public contractaddr;

 private selectedshift;
 private cad;
  
 public contractABI1;
   public contractAddress1: any;
  public contractObj; 

  public transhash;  
  public successful_msg;


 is_edit : boolean = false;



  constructor(private http: Http, private accountService: AccountService, private router: Router,  private flashMessagesService: FlashMessagesService, public renderer: Renderer, public el: ElementRef, public dataService: DataService) { 
  this.is_edit = true;

    this.callContractd();
   this.windowLoaded();
  this.callUser();
  
   
    }

 
 @HostListener('window:load')
   windowLoaded() {
  this.callContractd();
  
   if(this.caddr)
    { 
      this.checkAndInstantiateWeb3();
       this.callICO();
      this.tokenDetails().then(initialtotalsupply => this.initialtotalsupply = initialtotalsupply);
        // this.checkFunc();
    } 
     
    
     
 
  }  


   get data():any { 
    return this.dataService.serviceData; 
  } 
  set data(value: any) { 
    this.dataService.serviceData = value; 
  } 

    ngOnInit(){
   
 this.formtrans = new FormGroup({
     youramt: new FormControl('.', [Validators.required]),
     yourwaddr: new FormControl('.', [Validators.required])
   
  });

  this.formpurch = new FormGroup({
     youramtp: new FormControl('.', [Validators.required]),
     yourwaddrp: new FormControl('.', [Validators.required])
   
  });

  this.formapprov = new FormGroup({
     youramta: new FormControl('.', [Validators.required]),
     yourwaddra: new FormControl('.', [Validators.required])
   
  });

  this.formtranstft = new FormGroup({
     youramttft: new FormControl('.', [Validators.required]),
     yourfromwaddrtft: new FormControl('.', [Validators.required]),
      yourtowaddrtft: new FormControl('.', [Validators.required])
   
  });

}





onChange1(caddr){
    console.log("caddr"+caddr);
    
    return new Promise((resolve, reject) => {

    this.caddr = caddr;
   


  

   this.contractAddress1 = this.caddr;
 
   resolve(this.contractAddress1); 
  });

}

onChange2(cabi){
    
    console.log("cabi2"+cabi);
    
    return new Promise((resolve, reject) => {

   
   

    this.cabi = cabi;

   


   this.contractABI1 = JSON.parse(this.cabi || '{}');
   
  
   console.log("cabi123"+this.contractABI1);
   //return this.contractABI1;
   resolve(this.contractABI1); 
  });

}

onChange3(net){
   
    
    console.log("net"+net);
    return new Promise((resolve, reject) => {

   

    this.net = net;


 
   resolve(this.net); 
  });

}

  

  callContractd(){
    this.accountService.getcontractd().subscribe(response => { this.contractdetails = response.contractdetails[0];  console.log(this.contractdetails); this.onChange1(this.contractdetails.caddr).then(contractAddress1 => this.contractAddress1 = contractAddress1);
    this.onChange2(this.contractdetails.cabi).then(contractABI1 => this.contractABI1 = contractABI1); this.onChange3( this.contractdetails.net).then(net => this.net = net);} );
      
     //console.log(this.contractdetails); 
  
   }
    
    
    
    
   
    /*private contractABI= [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

   private contractAddress: string = "0xee79331948e70a0ee6315044535815a0721ef8a3";
   */

   private contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"}];

   private contractAddress: string = "0x8c54559CF9EA2B981f5Fe70080d47EbFbeFfC84c";

   public contractObj1;  
  

    
  
    public getWeb(): any {
      return this.setWeb3Provider();
    }

    private setWeb3Provider(): any {

    /*if (typeof this.web3 !== 'undefined') {
        return new Web33(this.web3.currentProvider);
      } else {
        this.web3 = new Web33(new Web33.providers.HttpProvider("https://ropsten.infura.io/Bux8yXId0u3s9Utxd8Aj"));
        // this.web3.eth.net.isListening().then(console.log);
        this.contractObj = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        return this.web3;
      }
      */
      



    }

    callICO(){
   
 this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0];   this.tokenBalowner(this.icodetail.ownerwa).then(balanceo => this.balanceo = balanceo); this.web3.eth.defaultAccount = this.balanceo; });
      
 }

     onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    //this.nameChange.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.' 
        );
        return;
      }
      console.log(accs);
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      //this._ngZone.run(() =>
        //this.refreshName()
      //);
    });
  };
   


    checkFunc(){
    
   
    console.log(this.web3);


      //this.web3.eth.defaultAccount = this.icodetail.ownerwa;
        this.web3.eth.defaultAccount = "0x1d55789Ec45378eE7E9833B57d865B3D8187634E";
      //this.web3.eth.coinbase = "0x1d55789Ec45378eE7E9833B57d865B3D8187634E";
  //console.log(this.web3.eth.coinbase);

       

      
      console.log(this.web3);
      //web3.fromWei(this.web3.eth.getBalance(this.web3.eth.coinbase));
      //var cbasebal = this.web3.eth.getBalance(this.web3.eth.coinbase);
      //this.web3.eth.getBalance(this.web3.eth.coinbase).then((res)=>{console.log(res)});
      
      var balance = this.web3.eth.getBalance(this.web3.eth.defaultAccount, function(error, result){
          if(!error)
              console.log(JSON.stringify(result));
          else
              console.error(error);
      });

      var balance =  this.web3.fromWei('1', 'ether');
      //console.log("bal");
      //console.log(cbasebal);

      //var number = new BigNumber(10);

      //var val = this.web3.utils.isBigNumber(number);
      //console.log(val);
      //console.log(this.web3.utils.randomHex(0));
      //var x = new BigNumber(123.4567);
      //console.log(x);



    }


    checkAndInstantiateWeb3 = () => {
   
    console.log("caddr3"+this.contractAddress1);
    console.log("cabi3"+this.contractABI1);
    console.log("net3"+this.net);
    
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        console.warn(
          'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // Use Mist/MetaMask's provider
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.warn(
          'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.web3 = new Web3(
          new Web3.providers.HttpProvider(this.net)
        );

      }
       
        this.checkweb3(this.web3);
        this.callWallet(this.web3);
       
         
        //console.log("caddr"+this.caddr);
        //this.contractObj = new this.web3.eth.Contract(this.contractABI, this.contractAddress);

        ////this.contractObj = this.web3.eth.contract(this.contractABI).at(this.contractAddress);

        //this.contractObj = new this.web3.eth.Contract(this.cabi, this.caddr);

        //this.contractObj = this.web3.eth.contract(this.contractABI1).at(this.contractAddress1);

        this.mycontractfun(this.web3,this.contractABI1, this.contractAddress1).then( contractObj => this.contractObj = contractObj);

        
       
        //this.contractObj = this.web3.eth.contract(this.cabi).at(this.caddr);
        console.log("ji");
        console.log(this.contractObj);


    };


    public mycontractfun(web3, abi, addr) {

    return new Promise((resolve, reject) => { 
      console.log("345"+web3);
      console.log("345"+abi);
      console.log("345"+addr);
      this.web3 = web3;
      this.cabi = abi;
      this.caddr = addr;
      this.contractObj = this.web3.eth.contract(this.cabi).at(this.caddr);
     
     
       resolve(this.contractObj); 
      });



    }

    callWallet(web3){
    this.web3 = web3;
    console.log("p");
 this.accountService.getWdetails().subscribe(response => { this.waddr = response.waddr.walletaddr; console.log(response); console.log(this.waddr); this.tokenBal(this.waddr).then(balance => this.balance = balance); console.log(this.balance);});

 this.accountService.getWdetails().subscribe(response => { this.waddr = response.waddr.walletaddr; console.log(response); console.log(this.waddr); this.tokenBalme(this.web3, this.waddr).then(balanceme => this.balanceme = balanceme); });
 }

    transactionFT(){

    this.checkAndInstantiateWeb33();
    this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0];  this.trans(this.icodetail.ownerwa); });
      
 }

    transactionFTfromto(){

    this.checkAndInstantiateWeb33();
    this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0];  this.transfto(this.icodetail.ownerwa); });
      
 }



 purchaceTokens(){

    this.checkAndInstantiateWeb33();
    
    this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0];  this.purch(this.icodetail.ownerwa); console.log(this.icodetail);});
      
 }

 approveWallet(){

    this.checkAndInstantiateWeb33();
    
    this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0];  this.approv(this.icodetail.ownerwa);});
      
 }


  trans(bo){
   this.web3.eth.defaultAccount = bo;
   console.log(this.contractObj);
    console.log(this.web3.eth.defaultAccount);
    

    this.contractObj.transfer(this.yourwaddr,this.youramt, function(error, result){
          if(!error)
          {
              console.log("Done");
              console.log(JSON.stringify(result));
              alert("Transaction took place Successfully, check out in etherscan: "+JSON.stringify(result));
              this.successful_msg = "Transaction took place Successfully, check out in etherscan: ";
              this.transhash = JSON.stringify(result);
          }
          else
              console.error(error);
      });
       console.log( "TextAreaComponent::str: " + this.yourwaddr);
       console.log( "TextAreaComponent::str: " + this.youramt);
       

  }


  transfto(bo){
   this.web3.eth.defaultAccount = bo;
   console.log(this.contractObj);
    console.log(this.web3.eth.defaultAccount);
    console.log(this.web3.toWei(this.youramttft, 'ether'));
        

    this.contractObj.purchase( this.yourfromwaddrtft, this.youramttft, {from: bo, to:this.yourtowaddrtft, value: this.web3.toWei(this.youramttft, 'ether')}, function(error, result){
          if(!error)
          {
              console.log("Done");
              console.log(JSON.stringify(result));
              alert("Transaction took place Successfully, check out in etherscan: "+JSON.stringify(result));
              this.successful_msg = "Transaction took place Successfully, check out in etherscan: ";
              this.transhash = JSON.stringify(result);
          }
          else
              console.error(error);
      });


    /*this.contractObj.withdraw(this.web3.toWei(this.youramttft, 'ether'), function(error, result){
          if(!error)
          {
              console.log("Done");
              console.log(JSON.stringify(result));
              alert("Transaction took place Successfully, check out in etherscan: "+JSON.stringify(result));
              this.successful_msg = "Transaction took place Successfully, check out in etherscan: ";
              this.transhash = JSON.stringify(result);
          }
          else
              console.error(error);
      });*/
       console.log( "TextAreaComponent::str: " + this.yourfromwaddrtft);
       console.log( "TextAreaComponent::str: " + this.yourtowaddrtft);
       console.log( "TextAreaComponent::str: " + this.youramttft);
       

  }

  purch(bo){
   this.web3.eth.defaultAccount = this.waddr;
   console.log(this.contractObj);
    console.log(this.web3.eth.defaultAccount);
    console.log(this.web3.toWei('0.000433', 'ether'));
    
    

    this.contractObj.purchase( bo, this.youramtp, {value: this.web3.toWei('0.000464', 'ether')*this.youramtp}, function(error, result){
          if(!error)
          {
              console.log("Done");
              console.log(JSON.stringify(result));
              alert("Transaction took place Successfully, check out in etherscan: "+JSON.stringify(result));
              this.successful_msg = "Transaction took place Successfully, check out in etherscan: ";
              this.transhash = JSON.stringify(result);
          }
          else
              console.error(error);
      });

       
      
       console.log( "TextAreaComponent::str: " + this.yourwaddrp);
       console.log( "TextAreaComponent::str: " + this.youramtp);
       

  }

  approv(bo){
  //alert(this.waddr);
   this.web3.eth.defaultAccount = this.waddr;
  
    console.log(this.web3.eth.defaultAccount);
    

       this.contractObj.approve(this.waddr, this.balanceo, function(error, result){
          if(!error)
          {
              console.log("Done");
              console.log(JSON.stringify(result));
              alert("Now your account has been approved for making transaction");
              
          }
          else
              console.error(error);
      });
      
       
  }

 
      public async tokenDetails(): Promise<any> {

      console.log(this.contractObj);

      return new Promise((resolve, reject) => { 
       this.contractObj.totalSupply.call(function (err, totalSupply) {
        
       
      
         
          //var accountAddress = $('#accountAddress').val();
          //var accountAddress = this.web3.eth.defaultAccount;


         
        
           var results = 'Total supply: ' + totalSupply.round(5);

              console.log(results);

          resolve(totalSupply);   

    })    

    }) as Promise<any>;

        
    
    //console.log(this.contractObj.balanceOf(address).toNumber());
    }

  public async tokenBal(waddr): Promise<any> {
   console.log(this.contractObj);
   console.log(this.waddr);    
   this.waddr = waddr;
   return new Promise((resolve, reject) => { 
   
   this.contractObj.balanceOf.call(this.waddr, function (err, balance) {
    console.log(balance.c[0]);
    if(err != null) {
        reject(err);
      }
        resolve(balance.c[0]);   
   })
  }) as Promise<any>;

     //this.log += "kkkk";
   }

  

 public async tokenBalowner(owa): Promise<any> {
   console.log(this.contractObj);
   return new Promise((resolve, reject) => { 
   
   this.contractObj.balanceOf.call(owa, function (err, balance) {
    console.log(balance.c[0]);
        resolve(balance.c[0]);   
   })
  }) as Promise<any>;

     //this.log += "kkkk";
   }

  ConvertToInt(val){

  return parseInt(val);
}

public async tokenBalme(web3, mywaddr): Promise<any> {
   console.log(mywaddr);
   return new Promise((resolve, reject) => { 
   
   var balance = this.web3.eth.getBalance(mywaddr, function(error, result){
          if(!error)
              console.log(JSON.stringify(result));

          else
              console.error(error);

              var balanceme = Number(Math.round(result)+'e-18').toFixed(18);
              resolve(balanceme);  
      });
   
     

  }) as Promise<any>;

     //this.log += "kkkk";
}

checkweb3(web3){

this.web3 = web3;
 
if (this.web3.currentProvider.isMetaMask === true) {
        if (typeof this.web3.eth.defaultAccount === 'undefined') {
            //alert("Unlock metamask, for purchasing tokens"); 

            setTimeout(function(){
        // Get the initial account balance so it can be displayed.
        this.web3.eth.getAccounts((err, accs) => {
        if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
        }

        if (accs.length === 0) {
        alert(
        'Unlock your Ethereum client, for purchasing tokens' 
        );
        return;
        }
       
        });
        }, 3000);

        }
        else {
            
        
        console.log(this.web3.currentProvider.constructor.name);
        


    }
    }
    else {
    
         alert('No web3? Please use google chrome and metamask plugin to enter this Dapp!');
      
       
}


}

 transactionFTTest(){
 // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        console.warn(
          'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // Use Mist/MetaMask's provider
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.warn(
          'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.web3 = new Web3(
          new Web3.providers.HttpProvider(this.net)
        );

      }

  this.web3.eth.defaultAccount = "0x1d55789Ec45378eE7E9833B57d865B3D8187634E";
 this.contractObj1 = this.web3.eth.contract(this.contractABI).at(this.contractAddress);

   console.log("contract");
   console.log(this.contractObj1);
  console.log(this.contractAddress1);

 
    this.contractObj1.transfer("0x1d55789Ec45378eE7E9833B57d865B3D8187634E","1", function(error, result){
          if(!error)
          {
              console.log("Done");
              console.log(JSON.stringify(result));
          }
          else
              console.error(error);
      });
       console.log( "TextAreaComponent::str: " + this.yourwaddr);
       console.log( "TextAreaComponent::str: " + this.youramt);
       

    }

checkAndInstantiateWeb33 = () => {
   console.log(this.net);
   
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        console.warn(
          'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // Use Mist/MetaMask's provider
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.warn(
          'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.web3 = new Web3(
          new Web3.providers.HttpProvider(this.net)
        );

      }
   

        this.contractObj = this.web3.eth.contract(this.contractABI1).at(this.contractAddress1);
   };


refresh() {
this.windowLoaded();
 
}

public async condition(username): Promise<any> 
{
return new Promise((resolve, reject) => { 
console.log("u"+username);
  if(username == 'admin')
  {

   this.show = true;
   
  }
  else
  {
    this.show = false;
  }
   resolve(this.show);   

    

}) as Promise<any>;
}

callUser(){
 this.accountService.getProfile().subscribe(response => { this.user = response.user;  this.condition(this.user.username).then(show => this.show = show); } );

 }

 
    
}


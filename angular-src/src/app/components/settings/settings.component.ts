import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { PRofile } from '../../interfaces/profile';

import { ICODetail } from '../../interfaces/icodetail';
import { ContractDetail } from '../../interfaces/contractdetail';
import { HDetail } from '../../interfaces/homedetail';

import { WAddr } from '../../interfaces/walletaddr';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AbstractControl, FormsModule, FormGroup, FormArray, FormBuilder,
          Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
//import { customvalidate } from '../../services/customvalidate';
import { Constants } from '../../components/constants/bconstants';

declare var $: any;


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})



export class SettingsComponent implements OnInit {

  show: boolean = false;
   public baseurl = Constants.ABASEURL;
  
  user: PRofile;
  icodetail: ICODetail;
  waddr: WAddr;
  contractdetails: ContractDetail;
  hdetails: HDetail;

  private formdata;
  private formdataico;
  
  public icocount;

  private formdataw;
  private formdatahp;
  private formdatacd;

  public wcount;
  public cont;
  public ccount;
  public hcont;


  public PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/;


   profileForm: FormGroup;
   icoForm: FormGroup;
   waForm: FormGroup;
   contractForm: FormGroup;
   homeForm: FormGroup;

   public cabi:string;
   public caddr:string;

  constructor(private accountService: AccountService, private router: Router,  private flashMessagesService: FlashMessagesService) { 

/*this.cabi = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"}]';

this.caddr = '0x8c54559CF9EA2B981f5Fe70080d47EbFbeFfC84c';*/

this.callUser();
   
    this.callWallet();
    this.callHdetail();

    this.callContractd();


    this.callICO();
    
   
  }

  

  ngOnInit() {

   
    
 
  
   

 this.profileForm = new FormGroup({
     name1: new FormControl('.', [Validators.required]),
     email1: new FormControl('.', [Validators.required]),
     id: new FormControl(''),
      password: new FormGroup({
      passd1: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(50), Validators.pattern(this.PASSWORD_REGEXP)])),
      passd2: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(50), Validators.pattern(this.PASSWORD_REGEXP)])),
       }, {validators: this.customvalidate})
  });

    this.formdata = this.profileForm;

  this.icoForm = new FormGroup({
   
    tn: new FormControl(''),
    ts: new FormControl(''),
    decimal: new FormControl(''),
    totalsupply:new FormControl(''),
    rate: new FormControl(''),
    preicostartdate: new FormControl(''),
    preicoenddate: new FormControl(''),
    icostartdate: new FormControl(''),
    icoenddate: new FormControl(''),   
    timerenddate: new FormControl(''),
    softcap: new FormControl(''),
    hardcap: new FormControl(''),
    ownerwa: new FormControl(''),
    id: new FormControl('')  
  
  });

    this.formdataico = this.icoForm;

    this.waForm = new FormGroup({
   
    walletaddr: new FormControl(''),
    id: new FormControl(''),
    userid: new FormControl('')   
    
  
  });

    this.formdataw = this.waForm;


    this.homeForm = new FormGroup({
   
     aus: new FormControl(''),
    cus: new FormControl(''),
    ln: new FormControl(''),
    facebk: new FormControl(''),
    twitter: new FormControl(''),
    gplus: new FormControl(''),
    id: new FormControl('')  
    
  
  });

    this.formdatahp = this.homeForm;

    this.contractForm = new FormGroup({
   
    cabi: new FormControl(''),
    caddr: new FormControl(''),
    
    net: new FormControl(''),
    id: new FormControl('')
    
  
  });

    this.formdatacd = this.contractForm;
  
}

ngAfterViewChecked() {

   $("#saddrteletool").off().on('click', function() { 

  $("#saddrteletext").css("display","block");
    /* Get the text field */
  var copyText = $("#saddrteletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#saddrteletext").css("display","none");
  setTimeout(function(){
  $("#saddrspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#saddrspan").tooltip('destroy');
   }, 3000);
  
  });

}


  onGeneralSettingsSubmit(formdata1) {
  console.log(this.user );
 
  if(formdata1.invalid)
  {
      this.flashMessagesService.show("Error", { cssClass: 'alert-danger', timeout: 3000 });
  }
  else if(formdata1.get('email1').value == ".")  
  {
      this.formdata.name1 = formdata1.name1;
      this.formdata.patchValue({email1: this.user.email})
     this.formdata.passd1 = formdata1.passd1; 
     this.formdata.passd2 = formdata1.passd2;
     this.formdata.id = this.user._id;
    
  } 
   else if(formdata1.get('name1').value == ".")  
  {
      this.formdata.patchValue({name1: this.user.name})
     this.formdata.email1 = formdata1.email1;
     this.formdata.passd1 = formdata1.passd1; 
     this.formdata.passd2 = formdata1.passd2;
     this.formdata.id = this.user._id;
    
  }  
  else
  {
     this.formdata.name1 = formdata1.name1;
     this.formdata.email1 = formdata1.email1;
     this.formdata.passd1 = formdata1.passd1; 
     this.formdata.passd2 = formdata1.passd2;
     this.formdata.id = this.user._id;


  }

  this.formdata.patchValue({id: this.formdata.id});
console.log(this.formdata.value);

 this.accountService.updateProfile(this.formdata.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully updated the profile", { cssClass: 'alert-success', timeout: 3000 });
          window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });
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

 callICO(){
 this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0];   });
      
 }

 callWallet(){
 this.accountService.getWdetails()
      .subscribe(response => { this.waddr = response.waddr;  console.log(this.waddr); });
      
 }

 callHdetail(){
 this.accountService.gethdetails()
      .subscribe(response => { this.hdetails = response.hdetails[0];   });
      
 }

 callContractd(){
 this.accountService.getcontractd()
      .subscribe(response => { this.contractdetails = response.contractdetails[0];   });
      
 }

  customvalidate = (control: AbstractControl): {[key: string]: boolean} => {
  const p1 = control.get('passd1');
  const confirm = control.get('passd2');
  if (!p1 || !confirm) return null;
  return p1.value === confirm.value ? null : { nomatch: true };
  } 

  onICOSubmit(formdata1)
  {
  console.log(formdata1.value);
  
      this.accountService.getIcocount()
      .subscribe(response => { this.icocount = response.cont;
      console.log(this.icocount);

      console.log(this.icodetail);


      
      if(formdata1.get('tn').value != "") 
      { 
        this.formdataico.tn = formdata1.tn;
      } 
      else
      {
        
        this.formdataico.patchValue({tn: this.icodetail.tn});
      }
      if(formdata1.get('ts').value != "")
      {
        this.formdataico.ts = formdata1.ts;

      }
      else
      {
         this.formdataico.patchValue({ts: this.icodetail.ts});

      }
     
     if(formdata1.get('decimal').value != "")
      {
        this.formdataico.decimal = formdata1.decimal;
      }
      else
      {
         this.formdataico.patchValue({decimal: this.icodetail.decimal});
      }
     if(formdata1.get('totalsupply').value != "")
      {
        this.formdataico.totalsupply = formdata1.totalsupply;
      }
      else
      {
        
         this.formdataico.patchValue({totalsupply: this.icodetail.totalsupply});
      }
     if(formdata1.get('rate').value != "")
      {
        this.formdataico.rate = formdata1.rate;
      }
      else
      {
       this.formdataico.patchValue({rate: this.icodetail.rate});
      }
     if(formdata1.get('preicostartdate').value != "")
      {
        this.formdataico.preicostartdate = formdata1.preicostartdate;
      }
      else
      {
        this.formdataico.patchValue({preicostartdate: this.icodetail.preicostartdate});
      }
     if(formdata1.get('preicoenddate').value != "")
      {
        this.formdataico.preicoenddate = formdata1.preicoenddate;
      }
      else
      {
        this.formdataico.patchValue({preicoenddate: this.icodetail.preicoenddate});
      }
     if(formdata1.get('preicoenddate').value != "")
      {
        this.formdataico.preicoenddate = formdata1.preicoenddate;
      }
      else
      {
        this.formdataico.patchValue({preicoenddate: this.icodetail.preicoenddate});
      }
     if(formdata1.get('icostartdate').value != "")
      {
        this.formdataico.icostartdate = formdata1.icostartdate;
      }
      else
      {
        this.formdataico.patchValue({icostartdate: this.icodetail.icostartdate});
      }
      if(formdata1.get('icoenddate').value != "")
      {
        this.formdataico.icoenddate = formdata1.icoenddate;
      }
      else
      {
        this.formdataico.patchValue({icoenddate: this.icodetail.icoenddate});
      }
      if(formdata1.get('timerenddate').value != "")
      {
        this.formdataico.timerenddate = formdata1.timerenddate;
      }
      else
      {
        this.formdataico.patchValue({timerenddate: this.icodetail.timerenddate});
      }
      if(formdata1.get('softcap').value != "")
      {
        this.formdataico.softcap = formdata1.softcap;
      }
      else
      {
        this.formdataico.patchValue({softcap: this.icodetail.softcap});
      }
      if(formdata1.get('hardcap').value != "")
      {
        this.formdataico.hardcap = formdata1.hardcap;
      }
      else
      {
        this.formdataico.patchValue({hardcap: this.icodetail.hardcap});
      }
       if(formdata1.get('ownerwa').value != "")
      {
        this.formdataico.ownerwa = formdata1.ownerwa;
      }
      else
      {
        this.formdataico.patchValue({ownerwa: this.icodetail.ownerwa});
      }
     
      this.formdataico.patchValue({id: 1});
      
      
      console.log(this.formdataico.value);

     if(this.icocount == 1){

     this.accountService.updateICO(this.formdataico.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully updated the ICO details", { cssClass: 'alert-success', timeout: 3000 });
           window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

      } else {

      

      this.accountService.createICO(this.formdataico.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully added the ICO details", { cssClass: 'alert-success', timeout: 3000 });
          window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

      }  
      
  });
  }


  onWalletSubmit(formdata2)
  {
  console.log(formdata2.value);
  
     


      
      if(formdata2.get('walletaddr').value != "") 
      { 
        this.formdataw.walletaddr = formdata2.walletaddr;
      } 
      else
      {
        
        this.formdataw.patchValue({walletaddr: this.waddr.walletaddr});
      }
     
   this.formdataw.patchValue({id: this.user._id});
   this.formdataw.patchValue({userid: this.user._id});
     
      
      
      console.log(this.formdataw.value);

    

     this.accountService.updateWallet(this.formdataw.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully updated the Wallet details", { cssClass: 'alert-success', timeout: 3000 });
        window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

   
      

      this.accountService.createWallet(this.formdataw.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully added the Wallet details", { cssClass: 'alert-success', timeout: 3000 });
          window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

   
  }

  




  onHPSubmit(formdata2)
  {
  console.log(formdata2.value);
  
      this.accountService.gethpcount()
      .subscribe(response => { this.hcont = response.hcont;
      console.log(this.hcont);

     
      if(formdata2.get('aus').value != "") 
      { 
        this.formdatahp.aus = formdata2.aus;
      } 
     
      else
      {
        
        this.formdatahp.patchValue({aus: this.hdetails.aus});
      }

      if(formdata2.get('cus').value != "") 
      { 
        this.formdatahp.cus = formdata2.cus;
      } 
     
      else
      {
        
        this.formdatahp.patchValue({cus: this.hdetails.cus});
      }
      if(formdata2.get('ln').value != "") 
      { 
        this.formdatahp.ln = formdata2.ln;
      } 
     
      else
      {
        
        this.formdatahp.patchValue({ln: this.hdetails.ln});
      }
       if(formdata2.get('facebk').value != "") 
      { 
        this.formdatahp.facebk = formdata2.facebk;
      } 
       
      else
      {
        
        this.formdatahp.patchValue({facebk: this.hdetails.facebk});
      }
       if(formdata2.get('twitter').value != "") 
      { 
        this.formdatahp.twitter = formdata2.twitter;
      } 
      
      else
      {
        
        this.formdatahp.patchValue({twitter: this.hdetails.twitter});
      }
        if(formdata2.get('gplus').value != "") 
      { 
        this.formdatahp.gplus = formdata2.gplus;
      } 
      
      else
      {
        
        this.formdatahp.patchValue({gplus: this.hdetails.gplus});
      }
     
   this.formdatahp.patchValue({id: 1});
   
     
      
      
      console.log(this.formdatahp.value);

     if(this.hcont == 1){

     this.accountService.updateHomePage(this.formdatahp.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully updated the Home Page details", { cssClass: 'alert-success', timeout: 3000 });
        window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

      } else {

      

      this.accountService.createHomePage(this.formdatahp.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully added the ICO details", { cssClass: 'alert-success', timeout: 3000 });
          window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

      }  
      
  });
  }



  onContractSubmit(formdata2)
  {
  console.log(formdata2.value);
  
      this.accountService.getcontractcount()
      .subscribe(response => { this.ccount = response.ccont;
      console.log(this.ccount);

     

      
    if(formdata2.get('caddr').value != "") 
    { 
      this.formdatacd.caddr = formdata2.caddr;
    } 
    else
    {
      
      this.formdatacd.patchValue({caddr: this.contractdetails.caddr});
    }
     if(formdata2.get('cabi').value != "") 
    { 
      this.formdatacd.cabi = formdata2.cabi;
    } 
    else
    {
      
      this.formdatacd.patchValue({cabi: this.contractdetails.cabi});
    }
     if(formdata2.get('net').value != "") 
    { 
      this.formdatacd.net = formdata2.net;
    } 
    else
    {
      
      this.formdatacd.patchValue({net: this.contractdetails.net});
    }
     
   this.formdatacd.patchValue({id: 1});
   
     
      
      
      console.log(this.formdatacd.value);

     if(this.ccount == 1){

     this.accountService.updateContract(this.formdatacd.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully updated the Contract details", { cssClass: 'alert-success', timeout: 3000 });
        window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

      } else {

      

      this.accountService.createContract(this.formdatacd.value)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show("Successfully added the Contract details", { cssClass: 'alert-success', timeout: 3000 });
         window.scrollTo(0,0);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          
        }
      });

      }  
      
  });
  }


}


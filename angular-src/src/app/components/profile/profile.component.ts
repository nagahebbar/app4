import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user';
import { WAddr } from '../../interfaces/walletaddr';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: IUser;
  waddr: WAddr;

  constructor(private accountService: AccountService, private router: Router) {
 
   }

  

  ngOnInit() {


  this.callUser();
  this.callWallet();

  }


ngAfterViewChecked() {

   $("#paddrteletool").off().on('click', function() { 

  $("#paddrteletext").css("display","block");
    /* Get the text field */
  var copyText = $("#paddrteletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#paddrteletext").css("display","none");
  setTimeout(function(){
  $("#paddrspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#paddrspan").tooltip('destroy');
   }, 3000);
  
  });

}

  yourtherAddrform() {
	
  }

  submitEtherAddr() {

  }

callUser(){
 this.accountService.getProfile()
      .subscribe(response => { this.user = response.user;});
 }

 callWallet(){
 this.accountService.getWdetails()
      .subscribe(response => { this.waddr = response.waddr.walletaddr; console.log(this.waddr);  });
      
 }

}

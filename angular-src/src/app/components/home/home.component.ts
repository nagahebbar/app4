import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Constants } from '../../components/constants/bconstants';
import { AccountService } from '../../services/account.service';
import { ICODetail } from '../../interfaces/icodetail';
import { HDetail } from '../../interfaces/homedetail';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public baseurl = Constants.ABASEURL;
 icodetail: ICODetail;
  hdetail: HDetail;

  constructor(private accountService: AccountService) { console.log(Constants.ABASEURL); console.log("hi"); }

  ngOnInit() {
  	 this.callICO();
  	 this.callHomeDetails();
  }


ngAfterViewChecked() {
   
    $("#banuteletool").off().on('click', function() { 

  $("#banuteletext").css("display","block");
    /* Get the text field */
  var copyText = $("#banuteletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#banuteletext").css("display","none");
  setTimeout(function(){
  $("#banuspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#banuspan").tooltip('destroy');
   }, 3000);
  
  });


    $("#sathyateletool").off().on('click', function() { 

  $("#sathyateletext").css("display","block");
    /* Get the text field */
  var copyText = $("#sathyateletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#sathyateletext").css("display","none");
  setTimeout(function(){
  $("#sathyaspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#sathyaspan").tooltip('destroy');
   }, 3000);
  
  });

    $("#prashteletool").off().on('click', function() { 

  $("#prashteletext").css("display","block");
    /* Get the text field */
  var copyText = $("#prashteletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#prashteletext").css("display","none");
  setTimeout(function(){
  $("#prashspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#prashspan").tooltip('destroy');
   }, 3000);
  
  });

   $("#babuteletool").off().on('click', function() { 

  $("#babuteletext").css("display","block");
    /* Get the text field */
  var copyText = $("#babuteletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#babuteletext").css("display","none");
  setTimeout(function(){
  $("#babuspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#babuspan").tooltip('destroy');
   }, 3000);
  
  });

   $("#craftteletool").off().on('click', function() { 

  $("#craftteletext").css("display","block");
    /* Get the text field */
  var copyText = $("#craftteletext");

  /* Select the text field */
  copyText.select();
  
  /* Copy the text inside the text field */
  document.execCommand("copy");

  $("#craftteletext").css("display","none");
  setTimeout(function(){
  $("#craftspan").tooltip('show'); 
  }, 300);

   setTimeout(function(){
   $("#craftspan").tooltip('destroy');
   }, 3000);
  
  });


}

   callICO(){
 this.accountService.getIcodetails()
      .subscribe(response => { this.icodetail = response.icodetails[0]; });
      
 }

   callHomeDetails(){
   
 this.accountService.gethdetails()
      .subscribe(response => { this.hdetail = response.hdetails[0]; });
      
 }

}

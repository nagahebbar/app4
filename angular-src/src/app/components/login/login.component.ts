import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ILogin } from '../../interfaces/login';
import { Constants } from '../../components/constants/bconstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  userLogin: ILogin;
  public baseurl = Constants.ABASEURL;

  constructor(private accountService: AccountService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) {
      this.userLogin = <ILogin>{};

      
  }

  ngOnInit() {

   
  }

  onLoginSubmit() {
    this.accountService.authenticateUser(this.userLogin)
    .subscribe(response => {
      if (response.success) {
        this.accountService.storeUserData(response.user, response.token);
        this.flashMessagesService.show('You are logged in!', { cssClass: 'alert-success', timeout: 1000 });
       // this.router.navigate(['dashboard']);
        setTimeout(function(){ 

       window.parent.location.href = Constants.ABASEURL+"/dashboard";

        }, 1000);
      
      } else {
        this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
        
      }
    });
  }

}

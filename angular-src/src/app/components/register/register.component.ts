import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { AccountService } from '../../services/account.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Constants } from '../../components/constants/bconstants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: IUser;
  public baseurl = Constants.ABASEURL;

  constructor(private accountService: AccountService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) {
    this.user = <IUser>{};
    
  }

  ngOnInit() {

  }

  onRegisterSubmit() {
    this.accountService.registerUser(this.user)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/register']);
        }
      });
  }

}

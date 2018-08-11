import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { AccountService } from '../../services/account.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Constants } from '../../components/constants/bconstants';
import { AbstractControl, FormsModule, FormGroup, FormArray, FormBuilder,
          Validators,ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-resetpasswd',
  templateUrl: './resetpasswd.component.html',
  styleUrls: ['./resetpasswd.component.css']
})
export class ResetpasswdComponent implements OnInit {

  user: IUser;
  public baseurl = Constants.ABASEURL;
  resetform: FormGroup;
  private rformdata;
  public token;
  constructor(private accountService: AccountService,
    private flashMessagesService: FlashMessagesService,
    private router: Router, private route: ActivatedRoute) {

    
  }

  ngOnInit() {

   this.resetform = new FormGroup({
   
    passd1: new FormControl(''),
    passd2: new FormControl(''),
    token: new FormControl('')  
    
  });

    this.rformdata = this.resetform;


     this.token = this.route.snapshot.queryParams["token"];
    
  }

  onResetpSubmit(formdata2) {

console.log(formdata2);
  this.rformdata.passd1 = formdata2.get('passd1').value
  this.rformdata.passd2 = formdata2.get('passd2').value
  this.rformdata.token = this.token;

  console.log(formdata2.get('passd1').value);
  
    this.accountService.resetpasswd(this.rformdata.passd1, this.rformdata.passd2, this.rformdata.token)
      .subscribe(response => {
        if (response.success) {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-success', timeout: 3000 });

          setTimeout(function(){ window.parent.location.href = Constants.ABASEURL+"/login"; }, 3000);
         
        } else {
          this.flashMessagesService.show(response.message, { cssClass: 'alert-danger', timeout: 3000 });
         
        }
      });
  }

}

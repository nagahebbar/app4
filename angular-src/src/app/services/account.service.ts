import { Injectable } from '@angular/core';
import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef, Renderer, Directive, ViewChild, trigger, state, animate, transition, style, AfterViewInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Constants } from '../components/constants/bconstants';
import { IUser } from '../interfaces/user';
import { ILogin } from '../interfaces/login';
import { PRofile } from '../interfaces/profile';
import { ICODetail } from '../interfaces/icodetail';
import { ContractDetail } from '../interfaces/contractdetail';
import { HDetail } from '../interfaces/homedetail';
import { WAddr } from '../interfaces/walletaddr';
import { JwtHelperService } from '@auth0/angular-jwt';



import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {


  waddr: WAddr;
  private header: Headers;
  private toke: string;
  public apiurl = Constants.APIURL;
  public baseurl = Constants.ABASEURL;
  public myAPI: any;
  public waddr1: any;
  public myAPI1: any;
  public transactions;

  constructor(private http: Http, private jwtHelperService: JwtHelperService) {
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json');
    
    //this.callmyWallet().then((myAPI1) => {this.myAPI1 = myAPI1; console.log(this.myAPI1)});
   
  }


 

  registerUser(user: IUser) {
    return this.http.post(this.apiurl+'/users/register', user, { headers: this.header })
      .map(res => res.json());
  }

  forgotpasswd(user: IUser) {

  var Indata = {user:user, burl:this.baseurl}

    return this.http.post(this.apiurl+'/users/forgot_password', Indata, { headers: this.header })
      .map(res => res.json());
  }

  resetpasswd(p1, p2, to) {

  var Indata = {password:p1, confirm:p2, token: to}

    return this.http.post(this.apiurl+'/users/reset_password', Indata, { headers: this.header }).map(res => res.json());
  }

  updateProfile(user: IUser) {

    return this.http.put(this.apiurl+'/users/updateprofile', user, { headers: this.header })
      .map(res => res.json());
  }

  updateICO(icodetail: ICODetail) {
    return this.http.put(this.apiurl+'/users/updateico', icodetail, { headers: this.header })
      .map(res => res.json());
  }

  createWallet(waddr: WAddr) {
    return this.http.post(this.apiurl+'/users/createwallet', waddr, { headers: this.header })
      .map(res => res.json());
  }

  updateWallet(waddr: WAddr) {
    return this.http.put(this.apiurl+'/users/updatewallet', waddr, { headers: this.header })
      .map(res => res.json());
  }

  createContract(contdet: ContractDetail) {
    return this.http.post(this.apiurl+'/users/createcontractd', contdet, { headers: this.header })
      .map(res => res.json());
  }

  updateContract(contdet: ContractDetail) {
    return this.http.put(this.apiurl+'/users/updatecontractd', contdet, { headers: this.header })
      .map(res => res.json());
  }


  createHomePage(hpdet: HDetail) {
    return this.http.post(this.apiurl+'/users/createhdetail', hpdet, { headers: this.header })
      .map(res => res.json());
  }

  updateHomePage(hpdet: HDetail) {
    return this.http.put(this.apiurl+'/users/updatehdetail', hpdet, { headers: this.header })
      .map(res => res.json());
  }


  createICO(icodetail: ICODetail) {
    return this.http.post(this.apiurl+'/users/createico', icodetail, { headers: this.header })
      .map(res => res.json());
  }

  authenticateUser(user: ILogin) {
    return this.http.post(this.apiurl+'/users/authenticate', user, { headers: this.header })
      .map(res => res.json());
  }

   getIcodetails () {
    var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/geticodetails', { headers: this.header })
      .map(res => res.json());
  }
   getWdetails () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/getwdetails', { headers: this.header })
      .map(res => res.json());
  }

   getWCdetails () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/getwalletandcontractdetails', { headers: this.header })
      .map(res => res.json());
  }

  gethdetails () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/gethdetails', { headers: this.header })
      .map(res => res.json());
  }
   getcontractd () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/getcontractd', { headers: this.header })
      .map(res => res.json());
  }

  createhdetail () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/createhdetail', { headers: this.header })
      .map(res => res.json());
  }

  getWalletcount () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/getwalletcount', { headers: this.header })
      .map(res => res.json());
  }

  getcontractcount () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/getcontractcount', { headers: this.header })
      .map(res => res.json());
  }

  gethpcount () {
     var token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/gethpcount', { headers: this.header })
      .map(res => res.json());
  }

 


  

  getIcocount () {
    
    return this.http.get(this.apiurl+'/users/geticocount', { headers: this.header })
      .map(res => res.json());
  }

  getProfile () {
    const token: string =  this.jwtHelperService.tokenGetter();
    //console.log(token);
    this.header.set('Authorization', token);
    return this.http.get(this.apiurl+'/users/profile', { headers: this.header })
      .map(res => res.json());
  }

  storeUserData(user: string, toke: string) {
    localStorage.setItem('token', toke);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
  }

  isUserLoggedin() {

    const token: string = this.jwtHelperService.tokenGetter();
    //console.log("t"+token);
    
      if(token !== "undefined" || token !== null) 
      {
       
    //console.log(!this.jwtHelperService.isTokenExpired(token));
    if (!token) {
      
       return false; 
      } 
    else if (this.jwtHelperService.isTokenExpired(token)) { return true; }
      else {
     
     }
    }
   return true;
  }


}

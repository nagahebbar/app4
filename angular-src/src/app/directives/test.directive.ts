import { Directive, ElementRef, Input, OnInit } from '@angular/core';
 @Directive({
 selector: '[dirTest]'
 })
 export class TestDirectives implements OnInit {
       @Input() name: string;
       @Input() value: string;

       
       constructor(private elementRef: ElementRef) {

      

       }


      ngOnInit() {
           //console.log("input-box keys : ", this.name, this.value);
      }
 }
import { Directive, 
  OnInit, 
  Renderer2, 
  ElementRef, 
  HostListener,
  Input,
  HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {
  @Input() defaultColor : string = '';
  @Input() highlightColor : string = 'yellow';
  @HostBinding('style.backgroundColor') backgroundColor: string ='';
  constructor(private elementRef: ElementRef ,private renderer : Renderer2){   

}
ngOnInit(){
  this.backgroundColor = this.defaultColor;
  //this.renderer.setStyle(this.elementRef.nativeElement,'background-color','pink');
  }
  
  
  
  @HostListener('mouseenter') mouseover(eventData: Event){
  //this.renderer.setStyle(this.elementRef.nativeElement,'background-color','pink');
  this.backgroundColor =this.highlightColor;
  }
  
  @HostListener('mouseleave') mouseleave(eventData: Event){
  //this.renderer.setStyle(this.elementRef.nativeElement,'background-color','transparent');
  this.backgroundColor = this.defaultColor;
  }

}



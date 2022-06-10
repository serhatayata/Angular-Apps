import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  @Input() message:string;
  @Output() close = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onclose(){
    this.close.emit("deneme");
  }

}

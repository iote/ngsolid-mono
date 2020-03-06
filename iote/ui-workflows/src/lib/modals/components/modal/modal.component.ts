import { Component, Output } from "@angular/core";
import { EventEmitter } from 'events';

/**
 * Standard Modal Layout
 */
@Component({
  selector: 'iote-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class UIModalComponent
{
  @Output() exit = new EventEmitter();

  constructor() { }

  exitModal(): void {
    this.exit.emit('exit');
  }
}

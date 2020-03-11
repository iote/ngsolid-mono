import { Directive, Output, EventEmitter, HostBinding, HostListener, Input, ElementRef } from '@angular/core';

const DEFAULT_COLOR = '#9ecbec';

@Directive({
  selector: '[ngfireFileDragUpload]'
})
export class FileDragUploadDirective
{
  @Input() dragColor: string;
  @Output() onFileDropped = new EventEmitter<any>();
  @Output() dragOver = new EventEmitter<any>();
  @Output() dragLeave = new EventEmitter<any>();

  @HostBinding('style.background-color') private _background = 'inherit';
  @HostBinding('style.opacity')          private _opacity = '1'
  @HostBinding('style.cursor')           private _cursor = 'inherit';

  constructor(private _el: ElementRef) { }

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this._background = this.dragColor ? this.dragColor : DEFAULT_COLOR;
    this._opacity = '0.6';
    this._cursor = 'pointer';

    this.dragOver.emit();
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this._background = 'inherit';
    this._opacity = '1';
    this._cursor = 'inherit';

    this.dragLeave.emit();
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this._background = 'inherit';
    this._opacity = '1';
    this._cursor = 'inherit';

    if(evt.dataTransfer.files)
    {
      const files = evt.dataTransfer.files;

      if (files.length > 0)
        this.onFileDropped.emit(files)
    }

    this.dragLeave.emit();
  }

}

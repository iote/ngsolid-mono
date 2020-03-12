import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, take } from 'rxjs/operators';

/** */
@Component({
  selector: 'ngfire-file-manager-pane',
  styleUrls: ['./file-manager-pane.component.scss'],
  templateUrl: './file-manager-pane.component.html'
})
export class FileManagerPaneComponent implements OnInit
{
  @Input() position$: Observable<FolderIterator>;
  position: FolderIterator;
  /** Mock event. Only used in case of delete of current item. In that case, will be triggered to navigate to parent. */
  @Output() nodeClicked = new EventEmitter<FolderIterator>();


  @ViewChild('itemMenu') itemMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  contextMenuSub: Subscription;

  constructor(private _overlay: Overlay,
              private _viewContainerRef: ViewContainerRef,
              private _logger: Logger)
  { }

  ngOnInit() {
    this.position$.subscribe(pos => this.position = pos);
  }

  onNodeClicked(position: FolderIterator)
  {
    // just in case. The portal context immediately disappears after this command so we need to remove it
    this.close();

    this.nodeClicked.emit(position);
  }

  uploadFile(files: FileList)
  {
    this.position
        .upload(files).subscribe(() => true);
  }



  // For inspiration, @see: https://netbasal.com/context-menus-made-easy-with-angular-cdk-963797e679fc
  openContextMenu(evt: MouseEvent, item?: FolderIterator)
  {
    const x = evt.x; const y = evt.y;
    evt.preventDefault(); evt.stopImmediatePropagation(); evt.stopPropagation();
    this.close();

    const positionStrategy = this._overlay.position()
             .flexibleConnectedTo({ x, y })
             .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }]);

    this.overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.itemMenu, this._viewContainerRef, {  $implicit: item ? item : this.position }));

    this.contextMenuSub = fromEvent<MouseEvent>(document, 'click')
                            .pipe(filter(event => {
                                const clickTarget = event.target as HTMLElement;
                                return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
                              }),
                              take(1)
                            ).subscribe(() => this.close());
  }

  close()
  {
    this.contextMenuSub && this.contextMenuSub.unsubscribe();

    if (this.overlayRef)
    {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

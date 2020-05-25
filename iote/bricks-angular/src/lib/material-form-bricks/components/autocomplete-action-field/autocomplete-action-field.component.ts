import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'iote-autocomplete-action-field',
  templateUrl: './autocomplete-action-field.component.html',
  styleUrls: [ './autocomplete-action-field.component.scss' ]
})
export class AutocompleteActionFieldComponent<T> implements OnInit, OnChanges
{
  @Input() items: T[];
  selectedItemNow: string;
  @Input() selectedItem: T;
  @Input() itemFieldDisplayFn: (T) => string;
  @Input() highlightFn: (T) => boolean;
  @Input() required: boolean;

  @Output() itemSelected = new EventEmitter<T>();
  @Output() newItemTyped  = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if(this.selectedItem)
      this.selectedItemNow = this.itemFieldDisplayFn(this.selectedItem);
  };

  ngOnChanges(changes: SimpleChanges)
  {
    const items = changes['items'];
    const selectedItem = changes['selectedItem'];

    if(items)
      this.items = items.currentValue;

    if(selectedItem) {
      this.selectedItem = selectedItem.currentValue;
      this.selectedItemNow = this.itemFieldDisplayFn(selectedItem.currentValue);
    }
  }

  /** Unknown item typed -> Emit event that requests parent to create item. */
  onTypeSelectedItem(newItemName: any)
  {
    this.newItemTyped.emit(newItemName.target.value);
  }

  /** Item selected -> Set item. */
  onSelectItem(evt: any)
  {
    const item = evt.option.value;
    this.selectedItemNow = this.itemFieldDisplayFn(item);
    this.itemSelected.emit(item);
  }

}

import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'iote-autocomplete-action-field',
  templateUrl: './autocomplete-action-field.component.html',
  styleUrls: [ './autocomplete-action-field.component.scss' ]
})
export class AutocompleteActionFieldComponent<T> implements OnInit
{
  @Input() items: T[];
  selectedItemNow: string;
  @Input() selectedItem: T;
  @Input() itemFieldDisplayFn: (T) => string;
  @Input() required: boolean;

  @Output() itemSelected = new EventEmitter<T>();
  @Output() newItemTyped  = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if(this.selectedItem)
      this.selectedItemNow = this.itemFieldDisplayFn(this.selectedItem);
  };

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

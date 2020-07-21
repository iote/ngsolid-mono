import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'iote-autocomplete-action-field',
  templateUrl: './autocomplete-action-field.component.html',
  styleUrls: [ './autocomplete-action-field.component.scss' ]
})
export class AutocompleteActionFieldComponent<T> implements OnInit, OnChanges
{
  @Input() items: T[];
  displayItems: T[];
  selectedItemNow: string;
  @Input() selectedItem: T;
  @Input() itemFieldDisplayFn: (T) => string;
  @Input() highlightFn: (T) => boolean;
  @Input() required: boolean;

  @Output() itemSelected = new EventEmitter<T>();
  @Output() newItemTyped  = new EventEmitter<string>();

  private _filter: string;

  constructor() { }

  ngOnInit()
  {
    if(this.selectedItem)
      this.selectedItemNow = this.itemFieldDisplayFn(this.selectedItem);

    this.displayItems = this._getItems(this.items);
  };

  ngOnChanges(changes: SimpleChanges)
  {
    const items = changes['items'];
    const selectedItem = changes['selectedItem'];

    if(items)
      this.displayItems = this._getItems(items.currentValue);

    if(selectedItem) {
      this.selectedItem = selectedItem.currentValue;
      this.selectedItemNow = this.itemFieldDisplayFn(selectedItem.currentValue);
    }
  }

  /** Unknown item typed -> Emit event that requests parent to create item. */
  onTypeSelectedItem(newItemName: any)
  {
    this._filter = newItemName;
    this.displayItems = this._getItems(this.items);

    this.newItemTyped.emit(newItemName.target.value);
  }

  /** Item selected -> Set item. */
  onSelectItem(evt: any)
  {
    const item = evt.option.value;
    this.selectedItemNow = this.itemFieldDisplayFn(item);
    this.itemSelected.emit(item);
  }

  private _getItems = (items: T[]) => this.displayItems = this._sortFn(this._filterFn(items));

  private _filterFn = (items: T[]) => _.filter(items, i => this._getName(i).replace(' ', '').toLowerCase().indexOf(this._filter.replace(' ', '').toLowerCase())) as T[];
  private _sortFn   = (items: T[]) => _.orderBy(items, i => this.itemFieldDisplayFn ? this.itemFieldDisplayFn(i) : i, 'asc');

  private _getName  = (item: T)    => this.itemFieldDisplayFn ? this.itemFieldDisplayFn(item) : (item as any) as string;
}

import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'iote-multi-autocomplete-action-field',
  templateUrl: './multi-autocomplete-action-field.component.html',
  styleUrls: [ './multi-autocomplete-action-field.component.scss' ]
})
export class MultiAutocompleteActionFieldComponent<G,I> implements OnInit, OnChanges
{
  @Input() groups: G[];
  selectedItemNow = '';
  @Input() selectedItem: I;

  @Input() groupName:  (G) => string;
  @Input() groupItems: (G) => I[];

  @Input() itemFieldDisplayFn: (I) => string;
  @Input() highlightFn:        (I) => boolean;

  @Input() required: boolean;

  @Output() itemSelected = new EventEmitter<I>();
  @Output() newItemTyped  = new EventEmitter<string>();
  isLoaded = false;
  isNew = false;
  isCustomApproved = false;

  filter$$ = new BehaviorSubject<string>('');

  groupsDisplay$: Observable<G[]>;

  @ViewChild(MatAutocompleteTrigger) trigger;

  // Hack to make filter open on first focus.
  private firstFocus = true;

  constructor() { }

  ngOnInit() {

    if(this.selectedItem)
      this.selectedItemNow = this.itemFieldDisplayFn(this.selectedItem);

    this.groupsDisplay$ = this.filter$$
                              .pipe(map((filter) => this._filterGroups(this.groups, filter)));
  };

  private _filterGroups(groups: G[], filter: string)
  {
    // 1. The two conditions on which to show everthign
    if(filter == null || filter === '')
      return groups;
    // 1.b. If one is selected - Show everything
    if(groups && groups.find(g => this.groupItems(g).find(i => this.itemFieldDisplayFn(i) === filter)))
      return groups;

    if(groups != null)
      return groups.map(g => {
        filter = this._cleanFilter(filter);
        if(this._cleanFilter(this.groupName(g)).indexOf(filter) >= 0)
        {
          const cp = _.clone(g) as any;
          cp.pass = true;
          return cp;
        }
        else return g;
      });

    return [];
  }

  groupItemsInner(group: G)
  {
    const items = this.groupItems(group);
    if((group as any).pass)
      return items;

    const filter = this._cleanFilter(this.selectedItemNow);
    return items.filter(i =>  this._cleanFilter(this.itemFieldDisplayFn(i)).indexOf(filter) >= 0);
  }

  private _cleanFilter = (w: string) => w && w.toLowerCase().replace(' ', '');

  /** Hack; Trick the filter into thinking someone typed so it loads. */
  onFocus(evt: Event)
  {
    if(this.firstFocus)
    {
      this.filter$$.next('a');
      this.filter$$.next(this.selectedItemNow);
      this.firstFocus = false;
    }
  }

  onKeyUp(evt: Event)
  {
    this.isNew = false;
    this.isCustomApproved = false;
    this.newItemTyped.emit(null);
    this.filter$$.next(this.selectedItemNow);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    const items = changes['groups'];
    const selectedItem = changes['selectedItem'];

    if(items)
      this.groups = items.currentValue;

    if(selectedItem) {
      this.selectedItem = selectedItem.currentValue;
      this.selectedItemNow = this.itemFieldDisplayFn(selectedItem.currentValue);
    }
  }

  /** Unknown item typed -> Emit event that requests parent to create item. */
  onTypeSelectedItem(newItemName: any)
  {
    this.isNew = true;
    this.newItemTyped.emit(null);
  }

  /** Item selected -> Set item. */
  onSelectItem(evt: any)
  {
    this.isNew = false;
    this.isCustomApproved = false;

    const item = evt.option.value;
    this.selectedItemNow = this.itemFieldDisplayFn(item);
    this.itemSelected.emit(item);
  }

  approve() {
    this.isNew = false;
    this.isCustomApproved = true;
    this.newItemTyped.emit(this.selectedItemNow);
  }
}

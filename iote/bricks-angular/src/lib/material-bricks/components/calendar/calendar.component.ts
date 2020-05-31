import { Component, Output, EventEmitter, ViewChild, Renderer2, AfterViewInit, Input } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Logger } from '../../../util/services/logger.service';

@Component({
  selector: 'iote-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {

  @Output() dateSelected: EventEmitter<Moment> = new EventEmitter();
  @Input() date;
  @Input() min;
  @Input() max;

  @ViewChild('calendar')
  calendar: MatCalendar<Moment>;

  constructor(private renderer: Renderer2,
              private _logger: Logger)
  { }

  ngAfterViewInit()
  {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this._logger.log(() => 'CalendarComponent. Arrow buttons clicked');
        });
      });
    }
  }

  monthSelected(date: Moment) {
    this._logger.log(() => 'CalendarComponent. Month changed');
  }

  dateChanged() {
    this.calendar.activeDate = this.date;
    this.dateSelected.emit(this.date);
  }

  prevDay() {
    const prevMoment = moment(this.date).add(-1, 'days');
    this.date = prevMoment;
    this.dateChanged();
  }

  today() {
    this.date = moment();
    this.dateChanged();
  }

  nextDay() {
    const nextMoment = moment(this.date).add(1, 'days');
    this.date = nextMoment;
    this.dateChanged();
  }
}

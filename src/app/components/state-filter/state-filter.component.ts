import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-state-filter',
  templateUrl: './state-filter.component.html',
  styleUrls: ['./state-filter.component.css']
})
export class StateFilterComponent {
  
  states: string[] = ['az', 'ca', 'ny', 'tz', 'fl']; // Add more states as needed

  selectedState: string = 'az';

  @Output() stateChanged: EventEmitter<string> = new EventEmitter<string>();

  onStateChange(state: string): void {
    this.selectedState = state;
    this.stateChanged.emit(this.selectedState);
  }
}
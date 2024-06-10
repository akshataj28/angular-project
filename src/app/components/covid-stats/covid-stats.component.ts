import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../../covid-data.service';

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.css']
})
export class CovidStatsComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['Date', 'Rise In # Covid Cases', 'Fall in # Covid Cases'];
  selectedState: string = 'az';
  dataAvailable: boolean = true;

  constructor(private covidDataService: CovidDataService) {}

  ngOnInit(): void {
    this.fetchData(this.selectedState);
  }

  fetchData(state: string): void {
    this.covidDataService.getDailyData(state).subscribe(
        data => {
            // Check if data is received
            if (data && data.length > 0) {
                // Data received, proceed with calculations
                this.dataSource = data;
                this.calculateRiseAndFall();
                this.dataAvailable = true;
                console.log(data)
            } else {
                // No data received
                console.error(`No data available for state ${state}.`);
                this.dataSource = [];
                this.dataAvailable = false;
            }
        },
        error => {
            // Error occurred while fetching data
            console.error(`Error fetching data for state ${state}:`, error);
            this.dataSource = [];
            this.dataAvailable = false;
        }
    );
}

  calculateRiseAndFall(): void {
    this.dataSource[0].fall = 0

    for (let i = 1; i < this.dataSource.length; i++) {
      const currentDate = this.dataSource[i];
      const previousDate = this.dataSource[i - 1];
      const rise = currentDate.positiveIncrease;
      const fall = currentDate.positive - previousDate.positive;
      const num: number= previousDate.date;
      const numStr: string = num.toString();
      this.dataSource[i].rise = rise >= 0 ? rise : 0;
      this.dataSource[i].fall = fall >= 0 ? fall : 0;
      console.log(previousDate.date)
      this.dataSource[i-1].FormattedDate= numStr.slice(0,4)  + "/" + numStr.slice(4,6) + "/" + numStr.slice(6,9);
      console.log('formatted date: ',  this.dataSource[i].FormattedDate)
    }
  }

  onStateChanged(state: string): void {
    this.selectedState = state;
    this.fetchData(state);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { CovidDataService } from '../../covid-data.service';

// @Component({
//   selector: 'app-covid-stats',
//   templateUrl: './covid-stats.component.html',
//   styleUrls: ['./covid-stats.component.css']
// })
// export class CovidStatsComponent implements OnInit {
//   dataSource: any[] = [];
//   displayedColumns: string[] = ['Date', 'Rise In # Covid Cases', 'Fall in # Covid Cases'];

//   constructor(private covidDataService: CovidDataService) {}


//   ngOnInit(): void {
//     this.fetchData('az'); // Fetch data for Arizona as an example
//   }

//   fetchData(state: string): void {
//     this.covidDataService.getDailyData(state).subscribe(data => {
//       this.dataSource = data;
//       this.calculateRiseAndFall();
//     });
//   }

//   calculateRiseAndFall(): void {
//     for (let i = 1; i < this.dataSource.length; i++) {
//       const currentDate = this.dataSource[i];
//       const previousDate = this.dataSource[i - 1];
//       const rise = currentDate.positiveIncrease;
//       const fall = currentDate.positive- previousDate.positive;
//       console.log(currentDate.positive- previousDate.positive, currentDate.positive)
//       this.dataSource[i].rise = rise >= 0 ? rise : 0;
//       this.dataSource[i].fall = fall >= 0 ? fall : 0;
      
//     }
//   }


// }
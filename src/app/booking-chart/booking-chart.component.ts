import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Rooms } from '../rooms/Rooms';

@Component({
  selector: 'app-booking-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './booking-chart.component.html',
  styleUrl: './booking-chart.component.css'
})
export class BookingChartComponent {
  chartOptions = {
	  animationEnabled: true,
    explodeOnClick: true,
    theme: "light2",
	  data: [{
		type: "pie",
		startAngle: -90,
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 6, name: "Single" },
		  { y: 5, name: "Deluxe" },
		  { y: 2, name: "Suite" },
      { y: 7, name: "Not Booked"}
		]
	  }]
	}
}

import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.css',
})
export class RevenueChartComponent {
  chartOptions = {
    animationEnabled: true,
    exportsEnabled: true,
    theme: 'light2',
    axisX: {
      interval: 1,
      labelFontFamily: 'Arial',
      labelFontSize: 14,
      labelFontColor: '#666666',
    },
    axisY: {
      valueFormatString: '₹#,##0K',
      title: 'Amount (in INR)',
      titleFontFamily: 'Arial',
      titleFontSize: 16,
      titleFontColor: '#666666',
      labelFontFamily: 'Arial',
      labelFontSize: 14,
      labelFontColor: '#666666',
    },
    data: [
      {
        type: 'column',
        yValueFormatString: '₹#,##0K',
        indexLabel: '{y}',
        indexLabelPlacement: 'outside',
        indexLabelFontFamily: 'Arial',
        indexLabelFontSize: 14,
        indexLabelFontColor: '#666666',
        dataPoints: [
          { label: 'Mar', y: 201 },
          { label: 'Apr', y: 240 },
          { label: 'May', y: 166 },
          { label: 'Jun', y: 196 },
        ],
      },
    ],
  };
}

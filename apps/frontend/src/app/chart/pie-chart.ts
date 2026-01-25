import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { monthlyAssets } from './data'

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  template: `
    <div style="display: grid; place-content: center; height: 100svh;">
      <canvas baseChart type="pie" [data]="pieChartData" [options]="pieChartOptions"></canvas>
    </div>
  `
})
export default class PieChart implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective<'pie'>;

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    const targetData = monthlyAssets.find((item) => item.yearMonth === '2025-09');
    this.pieChartData = {
      labels: targetData!.assetsByCategory.map((asset) => asset.category),
      datasets: [
        {
          data: targetData!.assetsByCategory.map((asset) => asset.amount),
        },
      ],
    };
  }
}

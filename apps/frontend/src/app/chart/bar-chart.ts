import { Component, inject, type OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ActiveElement, ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { monthlyAssets, yearlyAssets } from './data';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  template: `
    <div style="display: grid; place-content: center; height: 100svh;">
      <canvas baseChart type="bar" [data]="barChartData" [options]="barChartOptions" (chartClick)="chartClicked($event)"></canvas>
    </div>
  `,
})
export default class BarChart implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective<'bar'>;
  private readonly route = inject(ActivatedRoute);
  private chartData: typeof monthlyAssets = [];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: { position: 'bottom' },
    },
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    const type = this.route.snapshot.queryParamMap.get('type');
    this.chartData = type === 'monthly' || type === null ? monthlyAssets : yearlyAssets;

    const labels = this.chartData.map((item) => {
      if (type === 'monthly' || type === null) {
        return `${item.yearMonth.split('-')[1]}月`;
      } else {
        return item.yearMonth.split('-')[0];
      }
    });
    const categories = [
      ...new Set(this.chartData.flatMap((item) => item.assetsByCategory.map((asset) => asset.category))),
    ];

    const datasets = categories.map((category) => {
      const data = this.chartData.map((item) => {
        const asset = item.assetsByCategory.find((a) => a.category === category);
        return asset ? asset.amount : 0;
      });
      return {
        data,
        label: category,
      };
    });
    console.log('datasets', datasets);

    this.barChartData = {
      labels,
      datasets,
    };
  }

  // chart click event
  public chartClicked({ active }: { event?: ChartEvent; active?: Object[] }): void {
    const clickedChartIndex = (active as ActiveElement[])[0]?.index;
    const selectedMonth = this.chartData[clickedChartIndex!];

    alert(JSON.stringify(selectedMonth, null, 4));
  }
}

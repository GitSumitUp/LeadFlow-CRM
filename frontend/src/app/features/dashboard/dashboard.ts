import { Component, OnInit } from '@angular/core';
import { Lead } from '../../shared/models/lead';
import { LeadService } from '../../services/lead';
import { BaseChartDirective } from 'ng2-charts';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  totalLeads: number = 0;
  closedLeads: number = 0;
  conversionRate: number = 0;

  pieChartLabels = ['New', 'Contacted', 'Closed'];
  
  pieChartData = {
  labels: ['New', 'Contacted', 'Closed'],
  datasets: [
    {
      data: [200, 120, 100]
    }
  ]
};

 
lineChartData: any = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],  
  datasets: [
    {
      data: [40, 55, 65, 70],   
      label: 'Conversion Rate Per Week (%)',
      borderColor: '#28a745',
      backgroundColor: 'rgba(40,167,69,0.2)',
      fill: true,
      tension: 0.3
    }
  ]
};



  barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
barChartData = {
  labels: this.barChartLabels,
  datasets: [
    { data: [40, 55, 70, 90, 65, 50, 30, 85, 55, 60, 95, 80], label: 'Leads per Month' }
  ]
};


  constructor(private leadService: LeadService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.leadService.getLeads().subscribe({
      next: (res: any) => {

        const leads: Lead[] = res.data || res; 

        this.totalLeads = leads.length;
        this.closedLeads = leads.filter(l => l.status === 'closed').length;
        this.conversionRate = this.totalLeads > 0
          ? Math.round((this.closedLeads / this.totalLeads) * 100)
          : 0;

        const newCount = leads.filter(l => l.status === 'new').length;
        const contactedCount = leads.filter(l => l.status === 'contacted').length;
        const closedCount = this.closedLeads;

        this.pieChartData.datasets[0].data = [
  newCount,
  contactedCount,
  closedCount
];

        const grouped: any = {};

        leads.forEach(l => {
         const date = new Date(l.createdAt || new Date()).toLocaleDateString();
          grouped[date] = (grouped[date] || 0) + 1;
        });

        this.lineChartData.labels = Object.keys(grouped);
        this.lineChartData.datasets[0].data = Object.values(grouped);
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
      }
    });

    this.leadService.getStats().subscribe(stats => {
      this.cdr.detectChanges();
    console.log("Stats from bot/backend:", stats);
    this.lineChartData.labels = ['Total', 'Closed', 'Conversion Rate'];
    this.lineChartData.datasets[0].data = [stats.total, stats.closed, stats.conversionRate];
    this.totalLeads = stats.total;
    this.closedLeads = stats.closed;
    this.conversionRate = stats.conversionRate;
     this.cdr.detectChanges();
  });
  }

}
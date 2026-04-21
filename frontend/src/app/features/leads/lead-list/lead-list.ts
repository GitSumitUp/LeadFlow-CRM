import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Lead } from '../../../shared/models/lead';
import { FormsModule } from '@angular/forms';
import { LeadService } from '../../../services/lead';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lead-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './lead-list.html',
  styleUrl: './lead-list.css',
})
export class LeadList implements OnInit {
  leads: any[] = [];

   lead: Lead = {
   _id: 0,                    
   name: '',                   
   email: '',                
   status: 'new',
  //  createdAt?: Date; 
  };

  constructor(private leadService: LeadService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchLeads();
  }

  fetchLeads() {
    this.leadService.getLeads().subscribe({
      next: (res: any) => {
        this.leads = res.data;
        this.cdr.detectChanges();
        console.log('Leads fetched successfully:', this.leads);
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
      }
    });
  }

  updateStatus(id: number, status: 'new' | 'contacted' | 'closed') {
    this.leadService.updateLeadStatus(id, status);
  }

  deleteLead(id: number) {
    this.leadService.deleteLead(id);
  }
}

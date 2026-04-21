import { Component } from '@angular/core';
import { Lead } from '../../../shared/models/lead';
import { FormsModule } from '@angular/forms';
import { LeadService } from '../../../services/lead';

@Component({
  selector: 'app-lead-form',
  imports: [FormsModule],
  templateUrl: './lead-form.html',
  styleUrl: './lead-form.css',
})
export class LeadForm {

  constructor(private leadService: LeadService) {}

  private leads: Lead[] = [];

  lead: Lead = {
  //  _id: '',                    
   name: '',                   
   email: '',                
   status: 'new',
  //  createdAt?: Date; 
  };

  addLead() {
    if (this.lead.name && this.lead.email) {
      this.leadService.addLead(this.lead).subscribe({ 
        next: (res) => {
        alert('Lead added successfully!');
        this.lead = { name: '', email: '', status: 'new' };
      },
      error: (err) => {
        console.error('Error adding lead:', err);
        alert('Failed to add lead. Please try again.');
      }
    });
    } else{
     alert('Please fill in all required fields.');
    }
  }
}

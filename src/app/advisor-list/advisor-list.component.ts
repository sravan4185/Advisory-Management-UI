import { Component, OnInit } from '@angular/core';
import { Advisor } from '../Model/advisor';
import { AdvisorService } from '../services/advisor.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-advisor-list',
  templateUrl: './advisor-list.component.html',
  styleUrls: ['./advisor-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,HttpClientModule],
})
export class AdvisorListComponent implements OnInit {
  advisors: Advisor[] = [];

  constructor(private advisorService: AdvisorService) { }

  ngOnInit(): void {
    this.advisorService.getAdvisors().subscribe((data: Advisor[]) => {
      this.advisors = data;
    });
  }

  deleteAdvisor(id: number): void {
    this.advisorService.deleteAdvisor(id).subscribe(() => {
      this.advisors = this.advisors.filter(a => a.id !== id);
    });
  }
  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this advisor?')) {
      this.deleteAdvisor(id);
    }
  }
}

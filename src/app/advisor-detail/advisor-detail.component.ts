import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Advisor } from '../Model/advisor';
import { AdvisorService } from '../services/advisor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advisor-detail',
  templateUrl: './advisor-detail.component.html',
  styleUrls: ['./advisor-detail.component.css'],
  standalone:true,
  imports:[
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AdvisorDetailComponent implements OnInit {
  advisorForm: FormGroup;
  advisorId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private advisorService: AdvisorService
  ) {
    this.advisorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      sin: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.maxLength(255)]],
      phone: ['', [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      healthStatus: [{ value: '', disabled: true }] // Disable the healthStatus input
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.advisorId = params['id'];
      if (this.advisorId) {
        this.advisorService.getAdvisor(this.advisorId).subscribe((advisor: Advisor) => {
          this.advisorForm.patchValue(advisor);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.advisorForm.valid) {
      const advisor: Advisor = this.advisorForm.getRawValue(); // Get the raw value including disabled fields
      if (this.advisorId) {
        advisor.id = this.advisorId;
        this.advisorService.updateAdvisor(advisor).subscribe(() => {
          this.router.navigate(['/advisor-list']);
        });
      } else {
        this.advisorService.createAdvisor(advisor).subscribe(() => {
          this.router.navigate(['/advisor-list']);
        });
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/advisor-list']);
  }
  get name() { return this.advisorForm.get('name'); }
  get sin() { return this.advisorForm.get('sin'); }
  get address() { return this.advisorForm.get('address'); }
  get phone() { return this.advisorForm.get('phone'); }
}

import { Component, OnInit } from '@angular/core';
import { PublicInfoService } from '../services/public-info.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  completedGardens: number = -1;
  totalOwners: number = -1;
  totalDecorators: number = -1;
  appointments: any = {};
  firms: any[] = [];
  searchName: string = '';
  searchAddress: string = '';
  sortBy: string = '';
  sortOrder: string = 'asc';

  constructor(private landingPageService: PublicInfoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.landingPageService.getLandingPageData().subscribe((data) => {
      this.completedGardens = data.completedGardens;
      this.totalOwners = data.totalOwners;
      this.totalDecorators = data.totalDecorators;
      this.appointments = data.appointments;
      this.firms = data.firms;
    });
  }

  searchFirms(): void {
    this.landingPageService
      .getFirms(
        this.searchName,
        this.searchAddress,
        this.sortBy,
        this.sortOrder
      )
      .subscribe((data) => {
        this.firms = data;
      });
  }

  sort(column: string): void {
    this.sortBy = column;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.searchFirms();
  }
}

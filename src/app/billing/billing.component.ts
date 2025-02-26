import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  @Input() title = new BehaviorSubject<string>('Finance');
  selectedIndex = 0; // Default to the first tab

  // Map for tab names and their respective indices
  tabIndexMap: any = {
    studentPayments: 0,
    payroll: 1,
    invoices: 2,
    payIns: 3,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the tab parameter from the URL and update selectedIndex accordingly
    this.route.queryParams.subscribe((params) => {
      const tab = params['tab'];
      if (tab && this.tabIndexMap[tab] !== undefined) {
        this.selectedIndex = this.tabIndexMap[tab];
      }
    });
  }

  // This function updates the URL when a tab is selected
  onTabChange(event: any) {
    const tabKeys = Object.keys(this.tabIndexMap);
    const selectedTab = tabKeys[event.index];

    // Update the URL without reloading the page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: selectedTab },
      queryParamsHandling: 'merge', // Keep other query params
    });
  }
}

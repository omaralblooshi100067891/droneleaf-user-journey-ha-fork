import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DRONES } from 'src/app/core/data/mock-drones';
import { Drone } from 'src/app/core/models/drone-library.model';

@Component({
  selector: 'app-drone-library',
  templateUrl: './drone-library.component.html',
  styleUrls: ['./drone-library.component.scss'],
})
export class DroneLibraryComponent  implements OnInit {

 drones: Drone[] = DRONES;
  filteredDrones: Drone[] = [];
  searchText: string = '';
  selectedTabIndex: number = 0;
  selectedFilter: string = '';
  openDropdown: string | null = null;
  tabs: (string | '')[] = [
    '', // All
    'Ready to Fly',
    'Ready for Learning',
    'Ready but Unlicensed',
    'Template Only',
    'In Progress'
  ];

  constructor(private eRef: ElementRef){}

  toggleDropdown(droneName: string): void {
    this.openDropdown = this.openDropdown === droneName ? null : droneName;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // if click is outside dropdown or button
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.openDropdown = null;
    }
  }

  ngOnInit(): void {
    this.filteredDrones = [...this.drones];
  }

applyFilter(): void {
  const term = this.searchText.toLowerCase();
  this.filteredDrones = this.drones.filter(drone => {
    const matchSearch = drone.name.toLowerCase().includes(term);
    const matchFilter = !this.selectedFilter || drone.application === this.selectedFilter;
    const matchTab = this.selectedTabIndex === 0 || drone.status === this.tabs[this.selectedTabIndex];
    return matchSearch && matchFilter && matchTab;
  });
}

  filterByTab(index: number): void {
    this.selectedTabIndex = index;
    const status = this.tabs[index];

    this.filteredDrones = this.drones.filter(drone => {
      const matchStatus = !status || drone.status === status;
      const matchSearch = drone.name.toLowerCase().includes(this.searchText.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  statusClass(status: string): string {
    const map: { [key: string]: string } = {
      'Ready to Fly': 'bg-green-100 text-green-800',
      'Ready for Learning': 'bg-blue-100 text-blue-800',
      'Ready but Unlicensed': 'bg-yellow-100 text-yellow-800',
      'Template Only': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-orange-100 text-orange-800'
    };
    return map[status] || 'bg-gray-200 text-gray-800';
  }

}

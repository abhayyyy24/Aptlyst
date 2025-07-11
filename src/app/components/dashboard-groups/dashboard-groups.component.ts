import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService, Group } from '../../services/group.service';

@Component({
  selector: 'app-dashboard-groups',
  imports: [CommonModule],
  templateUrl: './dashboard-groups.component.html',
  styleUrl: './dashboard-groups.component.css'
})
export class DashboardGroupsComponent {
  groups: Group[] = [];
  openDropdownIndex: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.fetchGroups();
  }

  async fetchGroups() {
    this.loading = true;
    this.error = null;
    try {
      this.groups = await this.groupService.getUserGroups();
    } catch (err) {
      this.error = 'Failed to load groups.';
    } finally {
      this.loading = false;
    }
  }

  toggleDropdown(index: number) {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  leaveGroup(index: number) {
    // Implement leave logic here
    alert(`Leaving group: ${this.groups[index].name}`);
    this.openDropdownIndex = null;
  }

  showSecretCode(index: number) {
    alert(`Secret code: ${this.groups[index].id}`);
    this.openDropdownIndex = null;
  }

  shareGroup(index: number) {
    alert(`Share group: ${this.groups[index].name}`);
    this.openDropdownIndex = null;
  }
}

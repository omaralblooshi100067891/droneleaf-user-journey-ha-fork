import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  stats = [
  {
    title: 'Drones',
    value: '20,283',
    percent: '↑ 5.35%',
    since: 'Since last month',
    color: 'text-green-600',
  },
  {
    title: 'Number of Flights',
    value: '47',
    percent: '↓ 1.23%',
    since: 'Since last month',
    color: 'text-red-500',
  },
  {
    title: 'Number of Users',
    value: '281',
    percent: '↑ 5.35%',
    since: 'Since last month',
    color: 'text-green-600',
  },
  {
    title: 'Lorem Ipsum',
    value: '20,283',
    percent: '↑ 5.35%',
    since: 'Since last month',
    color: 'text-green-600',
  }
];

tableData = [
  {
    name: 'X500_Target',
    created: '19/06/2025',
    lastUsed: '19/06/2025',
    app: 'Application',
    status: 'Ready for Learning',
    statusColor: 'text-blue-600 bg-blue-100',
  },
  {
    name: 'Medo-local',
    created: '19/06/2025',
    lastUsed: '19/06/2025',
    app: 'Application',
    status: 'Ready to Fly',
    statusColor: 'text-green-700 bg-green-100',
  },
  {
    name: 'ADASI',
    created: '15/06/2025',
    lastUsed: '19/06/2025',
    app: 'Application',
    status: 'Ready but Unlicensed',
    statusColor: 'text-yellow-700 bg-yellow-100',
  },
  {
    name: 'ENEC P3',
    created: '15/06/2025',
    lastUsed: '19/06/2025',
    app: 'Application',
    status: 'Template Only',
    statusColor: 'text-gray-700 bg-gray-100',
  },
  {
    name: 'Workshop_01',
    created: '12/06/2025',
    lastUsed: '13/06/2025',
    app: 'Application',
    status: 'In Progress',
    statusColor: 'text-orange-700 bg-orange-100',
  },
];

cards = [
    {
      name: 'X500_Target',
      time: 'Just now',
      progress: 85,
      progressColor: 'bg-green-500',
      dotColor: 'bg-green-500',
    },
    {
      name: 'Medo-local',
      time: '5 min ago',
      progress: 92,
      progressColor: 'bg-green-500',
      dotColor: 'bg-green-500',
    },
    {
      name: 'ADASI',
      time: '2 hours ago',
      progress: 67,
      progressColor: 'bg-green-500',
      dotColor: 'bg-blue-400',
    },
    {
      name: 'Workshop_01',
      time: '1 day ago',
      progress: 23,
      progressColor: 'bg-yellow-400',
      dotColor: 'bg-red-500',
    },
  ];

  tasks = [
    {
      title: 'Flight Path Of Drone XYZ',
      time: '2 hours ago',
      status: 'Completed'
    },
    {
      title: 'Batter Diagnosis Test',
      time: '4 hours ago',
      status: 'In-Progress'
    },
    {
      title: 'Censor Calibration',
      time: '1 day ago',
      status: 'Pending'
    },
    {
      title: 'Weather Assessment',
      time: '1 day ago',
      status: 'Completed'
    }
  ];

  getBadgeClasses(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'In-Progress':
        return 'bg-gray-200 text-gray-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  }
}

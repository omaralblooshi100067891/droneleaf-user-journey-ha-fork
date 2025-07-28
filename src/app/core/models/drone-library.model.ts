export interface Drone {
  name: string;
  dateCreated: Date;
  lastUsed: Date;
  application: string;
  status: 'Ready to Fly' | 'Ready for Learning' | 'Ready but Unlicensed' | 'Template Only' | 'In Progress';
}

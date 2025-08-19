export interface Drone {
  id: string;            // unique id
  name: string;
  type: 'indoor' | 'outdoor' | 'hybrid';
  range: number;         // flight range in meters
  camera: boolean;       // has camera or not
  createdAt: string;     // ISO date
}

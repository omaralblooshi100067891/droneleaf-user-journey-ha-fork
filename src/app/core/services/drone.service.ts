import { Injectable } from '@angular/core';
import { Drone } from '../models/drone.model';
import { LocalStorageService } from './local-storage.service';

const STORAGE_KEY = 'drones';

@Injectable({ providedIn: 'root' })
export class DroneService {
  constructor(private storage: LocalStorageService) {}

  private loadAll(): Drone[] {
    return this.storage.get<Drone[]>(STORAGE_KEY) ?? [];
  }

  private saveAll(drones: Drone[]): void {
    this.storage.set(STORAGE_KEY, drones);
  }

  getAll(): Drone[] {
    return this.loadAll();
  }

  getById(id: string): Drone | null {
    return this.loadAll().find(d => d.id === id) ?? null;
  }

  create(drone: Omit<Drone, 'id' | 'createdAt'>): Drone {
    const drones = this.loadAll();
    const newDrone: Drone = {
      ...drone,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    drones.push(newDrone);
    this.saveAll(drones);
    return newDrone;
  }

  update(id: string, changes: Partial<Drone>): Drone | null {
    const drones = this.loadAll();
    const index = drones.findIndex(d => d.id === id);
    if (index === -1) return null;

    drones[index] = { ...drones[index], ...changes };
    this.saveAll(drones);
    return drones[index];
  }

  delete(id: string): void {
    const drones = this.loadAll().filter(d => d.id !== id);
    this.saveAll(drones);
  }

  clearAll(): void {
    this.storage.remove(STORAGE_KEY);
  }
}

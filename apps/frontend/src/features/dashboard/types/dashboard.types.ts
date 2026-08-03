export interface DashboardStats {
  devices: number;
  online: number;
  temperature: number;
  relay: boolean;
}

export interface DashboardDevice {
  id: number;
  name: string;
  room: string;
  online: boolean;
  temperature: number;
  humidity: number;
  relay: boolean;
}

export interface DashboardActivity {
  id: number;
  title: string;
  time: string;
  type: "power" | "temperature" | "humidity";
}

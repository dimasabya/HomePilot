export interface Device {
  id: number;
  name: string;
  code: string;
  room: string;
  ip: string;

  online: boolean;
  relay: boolean;

  createdAt: string;
  updatedAt: string;
}

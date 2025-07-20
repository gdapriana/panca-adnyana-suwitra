export interface CreateEvent {
  name: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}
export interface UpdateEvent {
  name?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface QueryEvent {
  take?: string;
}

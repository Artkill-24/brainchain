export interface IEvent {
  type: string;
  payload: any;
  timestamp: number;
}

export interface IEventHandler {
  (event: IEvent): void;
}

export interface IEventEmitter {
  emit(event: IEvent): Promise<void>;
  on(eventType: string, handler: IEventHandler): void;
  off(eventType: string, handler: IEventHandler): void;
}
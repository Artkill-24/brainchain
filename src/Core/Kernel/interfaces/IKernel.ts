import { IEvent, IEventHandler } from "./IEventEmitter";

export interface IKernel {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getStatus(): string;
  registerModule(name: string, module: any): void;
  emit(event: IEvent): Promise<void>;
  on(eventType: string, handler: IEventHandler): void;
  off(eventType: string, handler: IEventHandler): void;
}

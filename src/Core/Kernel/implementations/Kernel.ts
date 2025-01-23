import { IKernel } from "../interfaces/IKernel";
import { EventEmitter } from "./EventEmitter";
import { IEvent, IEventHandler } from "../interfaces/IEventEmitter";

export class Kernel implements IKernel {
  private modules: Map<string, any>;
  private status: string;
  private eventEmitter: EventEmitter;

  constructor() {
    this.modules = new Map();
    this.status = "idle";
    this.eventEmitter = new EventEmitter();
  }

  async initialize(): Promise<void> {
    this.status = "initializing";
    await this.emit({
      type: "kernel:initializing",
      payload: null,
      timestamp: Date.now()
    });

    for (const [_, module] of this.modules) {
      if (module.initialize) {
        await module.initialize();
      }
    }

    this.status = "running";
    await this.emit({
      type: "kernel:ready",
      payload: null,
      timestamp: Date.now()
    });
  }

  async shutdown(): Promise<void> {
    this.status = "shutting_down";
    await this.emit({
      type: "kernel:shutting_down",
      payload: null,
      timestamp: Date.now()
    });

    for (const [_, module] of this.modules) {
      if (module.shutdown) {
        await module.shutdown();
      }
    }

    this.status = "idle";
  }

  getStatus(): string {
    return this.status;
  }

  registerModule(name: string, module: any): void {
    this.modules.set(name, module);
    this.emit({
      type: "kernel:module_registered",
      payload: { name, module },
      timestamp: Date.now()
    });
  }

  async emit(event: IEvent): Promise<void> {
    await this.eventEmitter.emit(event);
  }

  on(eventType: string, handler: IEventHandler): void {
    this.eventEmitter.on(eventType, handler);
  }

  off(eventType: string, handler: IEventHandler): void {
    this.eventEmitter.off(eventType, handler);
  }
}

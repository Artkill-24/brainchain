import { IEvent, IEventHandler, IEventEmitter } from "../interfaces/IEventEmitter";

export class EventEmitter implements IEventEmitter {
  private handlers: Map<string, Set<IEventHandler>>;

  constructor() {
    this.handlers = new Map();
  }

  async emit(event: IEvent): Promise<void> {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      const promises = Array.from(handlers).map(handler => handler(event));
      await Promise.all(promises);
    }
  }

  on(eventType: string, handler: IEventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: IEventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(eventType);
      }
    }
  }
}

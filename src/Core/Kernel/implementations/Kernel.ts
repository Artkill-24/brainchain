import { IKernel } from "../interfaces/IKernel";

export class Kernel implements IKernel {
  private modules: Map<string, any>;
  private status: string;

  constructor() {
    this.modules = new Map();
    this.status = "idle";
  }

  async initialize(): Promise<void> {
    this.status = "initializing";
    // Inizializzazione dei moduli
    for (const [_, module] of this.modules) {
      if (module.initialize) {
        await module.initialize();
      }
    }
    this.status = "running";
  }

  async shutdown(): Promise<void> {
    this.status = "shutting_down";
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
  }
}

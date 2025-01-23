export interface IKernel {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getStatus(): string;
  registerModule(name: string, module: any): void;
}

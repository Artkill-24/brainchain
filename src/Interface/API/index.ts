export interface IAPI {
  start(): Promise<void>;
  stop(): Promise<void>;
  getStatus(): string;
}

export class API implements IAPI {
  private status: string = "stopped";

  async start(): Promise<void> {
    this.status = "running";
  }

  async stop(): Promise<void> {
    this.status = "stopped";
  }

  getStatus(): string {
    return this.status;
  }
}

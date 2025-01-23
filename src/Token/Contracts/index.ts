export interface IContract {
  address: string;
  deploy(): Promise<void>;
  execute(method: string, params: any[]): Promise<any>;
}

export class BaseContract implements IContract {
  address: string = "";

  async deploy(): Promise<void> {
    // Implementazione base
  }

  async execute(method: string, params: any[]): Promise<any> {
    // Implementazione base
    return null;
  }
}

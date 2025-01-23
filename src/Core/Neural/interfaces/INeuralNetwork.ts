export interface INeuralNetwork {
  train(data: any[]): Promise<void>;
  predict(input: any): Promise<any>;
  getStatus(): string;
}

export interface INeuralEvents {
  "neural:training_started": { dataSize: number };
  "neural:training_progress": { epoch: number, loss: number };
  "neural:training_completed": { accuracy: number };
  "neural:prediction_made": { input: any, output: any };
}

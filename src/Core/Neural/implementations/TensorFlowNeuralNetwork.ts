import * as tf from "@tensorflow/tfjs";
import { INeuralNetwork } from "../interfaces/INeuralNetwork";
import { Kernel } from "../../Kernel/implementations/Kernel";

export class TensorFlowNeuralNetwork implements INeuralNetwork {
  private model: tf.Sequential;
  private status: string = "idle";
  private kernel: Kernel;

  constructor(kernel: Kernel) {
    this.kernel = kernel;
    this.model = tf.sequential();
    this.initializeModel();
  }

  private initializeModel() {
    this.model.add(tf.layers.dense({ units: 64, inputShape: [10], activation: "relu" }));
    this.model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    this.model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
    
    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: "binaryCrossentropy",
      metrics: ["accuracy"]
    });
  }

  async train(data: any[]): Promise<void> {
    this.status = "training";
    await this.kernel.emit({
      type: "neural:training_started",
      payload: { dataSize: data.length },
      timestamp: Date.now()
    });

    const xs = tf.tensor2d(data.map(d => d.input));
    const ys = tf.tensor2d(data.map(d => [d.output]));

    const history = await this.model.fit(xs, ys, {
      epochs: 10,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          await this.kernel.emit({
            type: "neural:training_progress",
            payload: { epoch, loss: logs?.loss },
            timestamp: Date.now()
          });
        }
      }
    });

    this.status = "trained";
    await this.kernel.emit({
      type: "neural:training_completed",
      payload: { accuracy: history.history.acc[9] },
      timestamp: Date.now()
    });
  }

  async predict(input: any): Promise<any> {
    const inputTensor = tf.tensor2d([input]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const output = await prediction.data();

    await this.kernel.emit({
      type: "neural:prediction_made",
      payload: { input, output: output[0] },
      timestamp: Date.now()
    });

    return { prediction: output[0] };
  }

  getStatus(): string {
    return this.status;
  }
}

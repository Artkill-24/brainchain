import { Kernel } from "../../Kernel/implementations/Kernel";
import { NeuralNetwork } from "../implementations/NeuralNetwork";
import { IEvent } from "../../Kernel/interfaces/IEventEmitter";

describe("Neural Network Module", () => {
  let kernel: Kernel;
  let neuralNetwork: NeuralNetwork;
  let events: IEvent[] = [];

  beforeEach(() => {
    kernel = new Kernel();
    neuralNetwork = new NeuralNetwork(kernel);
    events = [];

    kernel.on("neural:training_started", (event) => events.push(event));
    kernel.on("neural:training_progress", (event) => events.push(event));
    kernel.on("neural:training_completed", (event) => events.push(event));
    kernel.on("neural:prediction_made", (event) => events.push(event));
  });

  test("should emit events during training", async () => {
    await neuralNetwork.train([1, 2, 3, 4, 5]);
    
    expect(events.filter(e => e.type === "neural:training_started")).toHaveLength(1);
    expect(events.filter(e => e.type === "neural:training_progress")).toHaveLength(10);
    expect(events.filter(e => e.type === "neural:training_completed")).toHaveLength(1);
  });

  test("should emit event when making prediction", async () => {
    await neuralNetwork.predict({ input: [1, 2, 3] });
    
    const predictionEvents = events.filter(e => e.type === "neural:prediction_made");
    expect(predictionEvents).toHaveLength(1);
    expect(predictionEvents[0].payload.input).toBeDefined();
    expect(predictionEvents[0].payload.output).toBeDefined();
  });
});

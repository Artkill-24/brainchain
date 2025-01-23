import { Kernel } from "./Core/Kernel/implementations/Kernel";
import { NeuralNetwork } from "./Core/Neural/implementations/NeuralNetwork";

async function main() {
  const kernel = new Kernel();
  const neuralNetwork = new NeuralNetwork(kernel);

  kernel.registerModule("neural", neuralNetwork);
  
  await kernel.initialize();
  
  console.log("BrainChain is running...");
  console.log("Kernel status:", kernel.getStatus());
}

main().catch(console.error);

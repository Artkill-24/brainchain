import { Kernel } from "../implementations/Kernel";

describe("Kernel", () => {
  let kernel: Kernel;

  beforeEach(() => {
    kernel = new Kernel();
  });

  test("should initialize correctly", async () => {
    await kernel.initialize();
    expect(kernel.getStatus()).toBe("running");
  });

  test("should shutdown correctly", async () => {
    await kernel.initialize();
    await kernel.shutdown();
    expect(kernel.getStatus()).toBe("idle");
  });
});

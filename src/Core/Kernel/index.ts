export interface IKernelModule {
  initialize?: () => Promise<void>;
  shutdown?: () => Promise<void>;
}

export * from "./implementations/Kernel";

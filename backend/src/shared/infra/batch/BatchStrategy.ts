export interface IBatchOperation {
  exec(): Promise<void>;
}

export class BatchStrategy {
  private strategy: IBatchOperation;

  public setStrategy(strategy: IBatchOperation): void {
    this.strategy = strategy;
  }

  public async exec(): Promise<void> {
    await this.strategy.exec();
  }
}

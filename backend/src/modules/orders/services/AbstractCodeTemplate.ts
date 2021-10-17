import GamestoreCode from '../infra/typeorm/entities/GamestoreCode';

export interface IRequest {
  game_id?: string;
  cash?: number;
}

export default abstract class AbstractCodeTemplate {
  public async execute(request: IRequest): Promise<GamestoreCode> {
    await this.validateData(request);
    const code = await this.createCode(request);
    return code;
  }

  protected abstract createCode(request: IRequest): Promise<GamestoreCode>;

  protected abstract validateData(request: IRequest): Promise<void>;
}

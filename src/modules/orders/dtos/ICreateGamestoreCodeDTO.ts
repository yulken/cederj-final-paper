interface ICashRedeem {
  cash: number;
}

interface IGameRedeem {
  game: string;
}

export default interface ICreateGamestoreCodeDTO {
  id: string;

  code: string;

  json: ICashRedeem | IGameRedeem;

  is_redeemed: boolean;

  user_id: string;

  redeemed_at: Date;
}

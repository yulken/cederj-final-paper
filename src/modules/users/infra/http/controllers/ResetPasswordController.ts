import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, passwordConfirmation, token } = request.body;
    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({
      token,
      password,
      passwordConfirmation,
    });

    return response.status(204).json();
  }
}

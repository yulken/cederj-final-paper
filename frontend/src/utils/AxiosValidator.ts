import { AxiosResponse } from 'axios';
import AxiosError from '../errors/AxiosError';

export async function validateResponse(
  response: Promise<AxiosResponse>,
): Promise<AxiosResponse> {
  try {
    await response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err?.response?.data) throw new AxiosError(err.response.data);
  }
  return response;
}

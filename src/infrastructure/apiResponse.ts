interface IApiResponse {
  code: number;
  message: string;
  data: any;
}

export class ApiResponse {
  code: number;

  message: string;

  data: any;

  static create({
    code = 500,
    message = '',
    data = null,
  }: {
    code: number;
    message: string;
    data?: any;
  }): IApiResponse {
    const response: IApiResponse = {
      code,
      message,
      data,
    };
    return response;
  }
}

import {
  JsonController, Get, Req, Res, HttpCode,
} from 'routing-controllers';
import { Service, Inject } from 'typedi';
import { LineService } from '../services/LineService';

@JsonController('/api/v1/line')
@Service()
export class LineController {
  constructor(@Inject() private lineService: LineService) {}

  @Get('/')
  @HttpCode(200)
  async index(@Req() request: any, @Res() response: any) {
    try {
      const lines = await this.lineService.find({});
      return response.send({ data: lines });
    } catch (e) {
      console.log(e);
      return response.send({ message: 'an error accoured!' });
    }
  }

  @Get('/:id')
  @HttpCode(200)
  show(@Req() request: any, @Res() response: any) {
    try {
      return response.send({ message: 'Hello World!' });
    } catch (e) {
      console.log(e);
      return response.send({ message: 'an error accoured!' });
    }
  }
}

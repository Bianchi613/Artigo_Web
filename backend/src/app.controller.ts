import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teste')
@Controller('teste')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello, Alan!';
  }
}

import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task/task.service';

@Controller('plb')
export class AppController {
  constructor(private readonly taskSer: TaskService) {}

  @Get('intro')
  getHello() {
    //console.log(request);

    return 'Florian';
    // response.status(201).json({
    //   participant: 'Florian',
    //   annee: 2024,
    //   service: this.taskSer.sayHello(),
    // });
  }
}

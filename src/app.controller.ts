import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { TaskService } from './task/task.service';

@Controller('plb')
export class AppController {
  constructor(private readonly taskSer: TaskService) {}

  @Get('intro')
  getHello(@Req() request: Request, @Res() response: Response) {
    //console.log(request);

    return response.status(201).json({
      participant: 'Florian',
      annee: 2024,
      service: this.taskSer.sayHello(),
    });
  }
}

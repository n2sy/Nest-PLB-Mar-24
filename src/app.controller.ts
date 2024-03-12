import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('plb')
export class AppController {
  //constructor(private readonly appService: AppService) {}

  @Get('intro')
  getHello(@Req() request: Request, @Res() response: Response) {
    //console.log(request);

    return response.status(201).json({ participant: 'Florian', annee: 2024 });
  }
}

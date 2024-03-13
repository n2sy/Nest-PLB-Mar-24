import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskDTO } from './DTO/taskDTO';
import { UpperandfusionPipe } from '../upperandfusion/upperandfusion.pipe';
import { TaskService } from './task.service';

// @UseInterceptors(DurationInterceptor)
@Controller('task')
export class TaskController {
  //t = new Task();

  //constructor(private taskSer: TaskService) {}
  @Inject() taskSer: TaskService;

  @Get('test')
  test(@Res() response: Response) {
    return response.json({ message: this.taskSer.sayHello() });
  }

  // @UseInterceptors(DurationInterceptor)
  @Get('all')
  getAllTasks(@Res() response: Response) {
    if (response['participant'] == 'Florian')
      return response.json(this.taskSer.RecupererTasks());
    else
      return response
        .status(400)
        .json({ message: "Désolé, t un'es pas Florian" });
  }

  //   @Post('new')
  //   addTask(@Body('title') title, @Body('year') year, @Res() response: Response) {
  //     console.log(body);
  //   }
  @Post('new')
  addTask(@Body() body: TaskDTO, @Res() response: Response) {
    return response.json(this.taskSer.ajouterTask(body));
  }

  @Get('all/:id')
  getTaskById(@Param('id') taskId, @Res() response: Response) {
    return response.status(200).json(this.taskSer.chercherTaskParId(taskId));
  }

  @Put('edit/:id')
  updateTask(@Param('id') taskId, @Body() body, @Res() response: Response) {
    return response.status(200).json({
      message: 'task updated',
      taskUpdated: this.taskSer.editerTask(taskId, body),
    });
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') taskId, @Res() response: Response) {
    return response.status(200).json(this.taskSer.supprimerTask(taskId));
  }

  @Get('/filter')
  filterTask(
    @Query('startYear', new ParseIntPipe())
    year1,
    @Query('endYear', new ParseIntPipe())
    year2,
    @Res() response: Response,
  ) {
    return response.json(this.taskSer.chercherTasks(year1, year2));
  }

  @Post('testpipe')
  testerPipe(@Body(UpperandfusionPipe) data, @Res() response: Response) {
    return response.json({ resultat: data });
  }
}

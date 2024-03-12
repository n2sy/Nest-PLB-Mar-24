import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Task } from './models/task';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TaskDTO } from './DTO/taskDTO';

@Controller('task')
export class TaskController {
  allTasks: Task[] = [];
  //t = new Task()

  @Get('all')
  getAllTasks(@Res() response: Response) {
    return response.json(this.allTasks);
  }

  //   @Post('new')
  //   addTask(@Body('title') title, @Body('year') year, @Res() response: Response) {
  //     console.log(body);
  //   }
  @Post('new')
  addTask(@Body() body: TaskDTO, @Res() response: Response) {
    console.log(body instanceof TaskDTO);
    let id = uuidv4();
    let nTask = new Task(id, body.title, body.year, new Date());
    this.allTasks.push(nTask);

    return response.json({ message: 'Task Added', id });
  }

  @Get('all/:id')
  getTaskById(@Param('id') taskId, @Res() response: Response) {
    // console.log(typeof taskId);

    let selectedTask = this.allTasks.find((task) => task.id === taskId);
    if (!selectedTask)
      throw new NotFoundException("Le task demandé n'existe pas");
    return response.status(200).json(selectedTask);
  }

  @Put('edit/:id')
  updateTask(@Param('id') taskId, @Body() body, @Res() response: Response) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    if (i == -1)
      throw new NotFoundException(
        "Le task que vous souhaitez mettre à jour n'existe pas",
      );
    //V1 avec consturctor
    //this.allTasks[i] = new Task(taskId, body.title, body.year);
    //V2 avec ...
    this.allTasks[i] = { id: taskId, ...body }; // SPREAD OPERATOR
    return response
      .status(200)
      .json({ message: 'task updated', taskUpdated: this.allTasks[i] });
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') taskId, @Res() response: Response) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    if (i == -1)
      throw new NotFoundException(
        "Le task que vous souhaitez supprimer n'existe pas",
      );
    this.allTasks.splice(i, 1);
    return response.status(200).json({ message: 'Task Deleted' });
  }

  @Get('/filter')
  filterTask(
    @Query(
      'startYear',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    year1,
    @Query(
      'endYear',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    year2,
    @Res() response: Response,
  ) {
    let t = this.allTasks.filter(
      (task) => task.year >= year1 && task.year <= year2,
    );
    return response.json(t);
  }
}

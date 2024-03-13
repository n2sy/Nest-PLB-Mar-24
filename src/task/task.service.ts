import { Injectable, NotFoundException, Param, Res } from '@nestjs/common';
import { Task } from './models/task';
import { TaskDTO } from './DTO/taskDTO';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  allTasks: Task[] = [];
  sayHello() {
    return 'Hello Florian';
  }

  RecupererTasks() {
    return this.allTasks;
  }

  ajouterTask(body: TaskDTO) {
    let id = uuidv4();
    let nTask = new Task(id, body.title, body.year, new Date());
    this.allTasks.push(nTask);

    return { message: 'Task Added', id };
  }

  chercherTaskParId(taskId) {
    let selectedTask = this.allTasks.find((task) => task.id === taskId);
    if (!selectedTask)
      throw new NotFoundException("Le task demandé n'existe pas");
    return selectedTask;
  }

  editerTask(taskId, uTask) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    if (i == -1)
      throw new NotFoundException(
        "Le task que vous souhaitez mettre à jour n'existe pas",
      );
    //V1 avec consturctor
    //this.allTasks[i] = new Task(taskId, body.title, body.year);
    //V2 avec ...
    this.allTasks[i] = { id: taskId, ...uTask }; // SPREAD OPERATOR
    return this.allTasks[i];
  }

  supprimerTask(taskId) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    if (i == -1)
      throw new NotFoundException(
        "Le task que vous souhaitez supprimer n'existe pas",
      );
    this.allTasks.splice(i, 1);
    return { message: 'Task Deleted', id: taskId };
  }

  chercherTasks(year1, year2) {
    let t = this.allTasks.filter(
      (task) => task.year >= year1 && task.year <= year2,
    );
    return t;
  }
}

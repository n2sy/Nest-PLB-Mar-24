import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  sayHello() {
    return 'Hello Florian';
  }
}

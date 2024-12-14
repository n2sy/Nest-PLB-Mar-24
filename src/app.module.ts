import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'booksmanager',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(FirstMiddleware).forRoutes('plb*');

    // consumer.apply(SecondMiddleware).forRoutes('');
    // consumer
    //   .apply(FirstMiddleware)
    //   .forRoutes(
    //     { path: 'task*', method: RequestMethod.GET },
    //     { path: 'task*', method: RequestMethod.PUT },
    //   );
    // MorganMiddleware.configure('dev');
    // consumer.apply(MorganMiddleware).forRoutes('');

    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes('');

    //consumer.apply(TokenVerifyMiddleware).forRoutes('book*');
  }
}

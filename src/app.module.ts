import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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

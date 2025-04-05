import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Siddiqui@113',  // Your database password
    database: 'store',  // Your database name
    synchronize: true,  // Set to false in production
  }), ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

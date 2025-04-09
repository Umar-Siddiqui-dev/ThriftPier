import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { InventoryModule } from './inventory/inventory.module';
import { CustomersModule } from './customers/customers.module';
import { SolditemModule } from './solditem/solditem.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './customers/entities/customer.entity';
import { Inventory } from './inventory/entities/inventory.entity';
import { Solditem } from './solditem/entities/solditem.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.SQL_PASSWORD,
      database: 'store',
      models: [Customer, Inventory, Solditem],
      autoLoadModels: true,
      synchronize: true,
    }),
    DatabaseModule,
    InventoryModule,
    CustomersModule,
    SolditemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Customer } from 'src/customers/entities/customer.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Solditem } from 'src/solditem/entities/solditem.entity';



export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: configService.get<string>('SQL_PASSWORD'),
        database: 'store',
        models: [Customer,Inventory,Solditem],
        define: {
          timestamps: true,
          underscored: true,
        },
      });
      
      try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync();
        return sequelize;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
      }
    },
    inject: [ConfigService]
  },
];

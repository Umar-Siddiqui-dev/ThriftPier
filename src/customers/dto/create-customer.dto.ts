import { IsString, IsNotEmpty , IsEmail} from 'class-validator';
import { DataType } from 'sequelize-typescript';

export class CreateCustomerDto {

@IsString()
@IsNotEmpty()
name: string;

@IsString()
@IsNotEmpty()
@IsEmail()
email: string;

@IsString()
@IsNotEmpty()
password: string;

@IsString()
@IsNotEmpty()
role: string;

@IsString()
@IsNotEmpty()
soldId: any;

@IsString()
@IsNotEmpty()
boughtId: any;

}

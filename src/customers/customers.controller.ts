import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('signup')

  signup(@Body() CreateCustomerDto : CreateCustomerDto){
    return this.customersService.signUp(CreateCustomerDto);
  }

  @Post('login')
  login(@Body() LoginDto : LoginDto, @Res({ passthrough: true }) res: Response){
    return this.customersService.login(LoginDto, res);
  }
  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customersService.create(createCustomerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.customersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.customersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(+id);
  // }
}

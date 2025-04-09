import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customerModel.create(createCustomerDto as any);
  }

  findAll() {
    return this.customerModel.findAll();
  }

  findOne(id: number) {
    return this.customerModel.findByPk(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.update(updateCustomerDto as any, {
      where: { ID: id },
    });
  }

  remove(id: number) {
    return this.customerModel.destroy({
      where: { ID: id },
    });
  }
}

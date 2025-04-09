import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    private jwtService : JwtService
  ) {}

  async signUp (CreateCustomerDto : CreateCustomerDto){
    const {name,email,password,role,soldId,boughtId} = CreateCustomerDto
    
    const isEmail = await  this.customerModel.findOne({
      where:{
        email
      }
    })

    if(role !== 'seller' || 'buyer'){
      throw new HttpException("Invalid role, User can be only seller or buyer",HttpStatus.BAD_REQUEST)
    }
    if(isEmail){
      throw new HttpException("Email already exists",HttpStatus.BAD_REQUEST)
    }
    else{
      const hashPassword =await  bcrypt.hash(password,10)
      const customer = await this.customerModel.create({
        name,
        email,
        password: hashPassword,
        role,
        soldId,
        boughtId
      })

      return { customer, status: HttpStatus.CREATED }
    }
    
  }


  async login(loginDto : LoginDto,res: Response){

    const {email,password} = loginDto

    if(email && password)
      {
      const customer = await this.customerModel.findOne({
      where : {email}
    })

    if(!customer){
      throw new HttpException("Email not found",HttpStatus.UNAUTHORIZED)
    }

    const isPasswordValid = await bcrypt.compare(password,customer.password)
    if(!isPasswordValid){
      throw new HttpException("Invalid password",HttpStatus.UNAUTHORIZED)
    }

   const { access_token } = await this.generateJwt(customer.name,customer.email)
    
   res.cookie(
    'jwt',
    access_token,
    {
      httpOnly : true,
      sameSite: 'lax',        // or 'strict' / 'none' depending on your use case
      secure: false,          // Set to true in production with HTTPS
      maxAge: 1000 * 60 * 60,
    }
   )
    return { status : HttpStatus.OK, message : "Login successful"}

    }

    else {
      throw new HttpException("Email and password are required",HttpStatus.BAD_REQUEST)
    }


  }


  async generateJwt (name :string, email:string):Promise<{access_token : string}>{
    const payload = {name,email}
   
    const token = this.jwtService.sign(payload,{
      secret : process.env.JWT_SECRET,
      expiresIn : process.env.JWT_EXPIRATION
    })
    
    return{
      access_token : token
    }
  }
  // create(createCustomerDto: CreateCustomerDto) {
  //   return this.customerModel.create(createCustomerDto as any);
  // }

  // findAll() {
  //   return this.customerModel.findAll();
  // }

  // findOne(id: number) {
  //   return this.customerModel.findByPk(id);
  // }

  // update(id: number, updateCustomerDto: UpdateCustomerDto) {
  //   return this.customerModel.update(updateCustomerDto as any, {
  //     where: { ID: id },
  //   });
  // }

  // remove(id: number) {
  //   return this.customerModel.destroy({
  //     where: { ID: id },
  //   });
  // }
}

import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Customer } from "src/customers/entities/customer.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export  class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private configService: ConfigService,
        @InjectModel(Customer)
        private customerModel: typeof Customer
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }
    async validate(payload: any){
        const user = await this.customerModel.findOne({
            where: {ID: payload.sub}
        });
        if(!user){
            throw new UnauthorizedException();
        }
        return {
            id: user.ID,
            email: user.email,
            role: user.role
        };
    }
    
}
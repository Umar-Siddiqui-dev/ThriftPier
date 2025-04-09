import { timestamp } from "rxjs";
import { Table , Column , Model , DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Customer } from "../../customers/entities/customer.entity";
import { Solditem } from "../../solditem/entities/solditem.entity";

@Table({
    tableName : "inventory",
    timestamps : true,
})

export class Inventory extends Model {

    @Column({
        primaryKey :true,
        allowNull : false,
        autoIncrement : true,
    })
    ID : number

    @Column({
        type : DataType.JSON,
        allowNull : false,
    })
    tags : any

    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    name : string

    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    price : number

    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    quantity : number   

    @ForeignKey(() => Customer)
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    sellerId : number

    
    @BelongsTo(() => Customer, 'sellerId')
    seller: Customer;

    @HasMany(() => Solditem, 'itemId')
    soldItems: Solditem[];
}

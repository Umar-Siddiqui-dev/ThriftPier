import { Table , Column , Model , DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Customer } from "src/customers/entities/customer.entity";
import { Inventory } from "src/inventory/entities/inventory.entity";

@Table({
    tableName : "solditem",
    timestamps : true,
})
export class Solditem extends Model {

    @Column({
        type : DataType.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
    })
    Id : number

    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    category : any
    
    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    name : string

    @Column({
        type : DataType.INTEGER,
        allowNull : true,
    })
    repairCost : number

    @Column({
        type : DataType.INTEGER,
        allowNull : true,
    })
    sellPrice : number

    @Column({
        type : DataType.INTEGER,
        allowNull : true,
    })
    buyPrice : number

    @ForeignKey(() => Inventory)
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    itemId : number

    @ForeignKey(() => Customer)
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    buyerId : number

    @ForeignKey(() => Customer)
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    sellerId : number

    @BelongsTo(() => Customer, 'buyerId')
    buyer : Customer

    @BelongsTo(() => Customer, 'sellerId')
    seller : Customer

    @BelongsTo(() => Inventory, 'itemId')
    inventoryItem: Inventory;
}

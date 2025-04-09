import { table } from "console";
import { json } from "sequelize";
import { Table, Column, Model, DataType ,HasMany } from "sequelize-typescript";
import { Inventory } from "../../inventory/entities/inventory.entity";
import { Solditem } from "src/solditem/entities/solditem.entity";

@Table({
    tableName: "customers",
    timestamps : true,

})

export class Customer extends Model {
    
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    ID: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password : string

    @Column({
        type : DataType.STRING,
        allowNull: false,
        defaultValue : "seller"
    })
    role : string 

    @Column({
     type : DataType.JSON,
     defaultValue : null
    })
    soldId : any

    @Column({
        type : DataType.JSON,
        defaultValue : null
       })
       boughtId : any

    // Define the sold items relation
    @HasMany(() => Inventory, 'sellerId')
    soldItems: Inventory[];

    @HasMany(() => Solditem, 'sellerId')
    soldItemsRecords: Solditem[];

    @HasMany(() => Solditem, 'buyerId')
    boughtItemsRecords: Solditem[];
}

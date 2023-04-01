import { Table, Model, DataType } from 'sequelize-typescript';
import { Column } from 'sequelize-typescript/dist/model/column/column';

@Table
export class Issue extends Model {
  @Column({ primaryKey: true,type: DataType.INTEGER })
    id!: number;
  @Column({type: DataType.CHAR})
    title: string;
  @Column({type: DataType.CHAR})
    description: string;
  @Column({type: DataType.INTEGER})
    position: number;
  @Column({type: DataType.DATE})
    createdAt: Date;
  @Column({type: DataType.CHAR})
    createdBy: string;
  @Column({type: DataType.DATE})
    updatedAt: Date;
  @Column({type: DataType.CHAR})
    updatedBy: string;
}

import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ modelName: 'test', timestamps: true, paranoid: true })
export default class Test extends Model<Test> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column(DataType.STRING(50))
  name: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  value: number;
}

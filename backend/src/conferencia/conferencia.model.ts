import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'conferencia',
  timestamps: true,
  createdAt: false,
  updatedAt: 'atualizado_em',
})
export class Conferencia extends Model<Conferencia> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare titulo: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare url: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare data: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare deletado_em: Date;
}

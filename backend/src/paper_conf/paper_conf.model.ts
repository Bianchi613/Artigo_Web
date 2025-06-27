import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  UpdatedAt,
} from 'sequelize-typescript';
import { Paper } from '../paper/paper.model';
import { Conferencia } from '../conferencia/conferencia.model';

export enum PaperConfStatus {
  EM_AVALIACAO = 'em avaliacao',
  ACEITO = 'aceito',
  REPROVADO = 'reprovado',
}

@Table({
  tableName: 'paper_conf',
  timestamps: true,
  createdAt: false,
  updatedAt: 'atualizado_em',
})
export class PaperConf extends Model<PaperConf> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Paper)
  @Column({ type: DataType.INTEGER, allowNull: false })
  paper_id: number;

  @ForeignKey(() => Conferencia)
  @Column({ type: DataType.INTEGER, allowNull: false })
  conferencia_id: number;

  @Column({
    type: DataType.ENUM('em avaliacao', 'aceito', 'reprovado'),
    allowNull: false,
  })
  status: PaperConfStatus;

  @Column({ type: DataType.DATE, allowNull: true })
  data_submissao: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletado_em: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: true })
  atualizado_em: Date;

  @BelongsTo(() => Paper)
  paper: Paper;

  @BelongsTo(() => Conferencia)
  conferencia: Conferencia;
}

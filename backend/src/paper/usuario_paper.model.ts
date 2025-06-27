import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { Paper } from './paper.model';

@Table({ tableName: 'usuario_paper', timestamps: false })
export class UsuarioPaper extends Model<UsuarioPaper> {
  @ForeignKey(() => Usuario)
  @Column(DataType.INTEGER)
  usuario_id: number;

  @ForeignKey(() => Paper)
  @Column(DataType.INTEGER)
  paper_id: number;

  @Column(DataType.DATE)
  deletado_em?: Date;
}

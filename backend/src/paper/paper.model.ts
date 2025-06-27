import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioPaper } from './usuario_paper.model';

@Table({ tableName: 'paper', timestamps: false })
export class Paper extends Model<Paper> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  titulo: string;

  @Column(DataType.STRING(255))
  url?: string;

  @Column(DataType.BLOB)
  pdf?: Buffer;

  @Column(DataType.TEXT)
  referencia?: string;

  @Column(DataType.DATE)
  deletado_em?: Date;

  @BelongsToMany(() => Usuario, () => UsuarioPaper)
  autores: Usuario[];
}

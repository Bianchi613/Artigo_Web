import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class Usuario extends Model<Usuario> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  nome: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  senha: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  lattes?: string;

  @AllowNull(false)
  @Column(DataType.ENUM('cliente', 'administrador'))
  perfil: 'cliente' | 'administrador';

  @Column(DataType.DATE)
  criado_em?: Date;

  @Column(DataType.DATE)
  atualizado_em?: Date;

  @Column(DataType.DATE)
  deletado_em?: Date;
}

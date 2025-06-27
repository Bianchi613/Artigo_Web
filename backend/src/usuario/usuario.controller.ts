import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Alan Bianchi',
        email: 'alan@bianchi.com',
        senha: '12345',
        lattes: 'http://lattes.cnpq.br/123456789',
        perfil: 'cliente',
      },
    },
  })
  async createUsuario(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    try {
      return await this.usuarioService.create(usuario);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      let message = 'Erro ao criar usuário';
      if (typeof error === 'object' && error && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
  })
  async getUsuarios(): Promise<Usuario[]> {
    try {
      return await this.usuarioService.findAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      let message = 'Erro ao buscar usuários';
      if (typeof error === 'object' && error && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async getUsuarioById(@Param('id') id: string): Promise<Usuario | null> {
    try {
      const usuario = await this.usuarioService.findById(Number(id));
      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      return usuario;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      let message = 'Erro interno do servidor';
      if (typeof error === 'object' && error && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Alan Bianchi Atualizado',
        email: 'alan@bianchi.com',
        lattes: 'http://lattes.cnpq.br/123456789',
        perfil: 'administrador',
      },
    },
  })
  async updateUsuario(
    @Param('id') id: string,
    @Body() usuario: Partial<Usuario>,
  ): Promise<Usuario | null> {
    try {
      const updated = await this.usuarioService.update(Number(id), usuario);
      if (!updated) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      return updated;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      let message = 'Erro interno do servidor';
      if (typeof error === 'object' && error && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 204, description: 'Usuário excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async deleteUsuario(@Param('id') id: string): Promise<boolean> {
    try {
      const deleted = await this.usuarioService.delete(Number(id));
      if (!deleted) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
      return deleted;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      let message = 'Erro interno do servidor';
      if (typeof error === 'object' && error && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

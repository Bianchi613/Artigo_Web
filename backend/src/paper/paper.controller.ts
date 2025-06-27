import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PaperService } from './paper.service';
import { Paper } from './paper.model';

@ApiTags('papers')
@Controller('papers')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os papers' })
  @ApiResponse({
    status: 200,
    description: 'Lista de papers',
    schema: {
      example: [
        {
          id: 1,
          titulo: 'Título do Paper',
          url: 'https://exemplo.com/paper.pdf',
          pdf: null,
          referencia: 'Referência bibliográfica',
          deletado_em: null,
          autores: [
            {
              id: 1,
              nome: 'Alan Bianchi',
              email: 'alan@bianchi.com',
              lattes: 'http://lattes.cnpq.br/123456789',
              perfil: 'cliente',
            },
            {
              id: 2,
              nome: 'Maria Silva',
              email: 'maria@silva.com',
              lattes: 'http://lattes.cnpq.br/987654321',
              perfil: 'administrador',
            },
          ],
        },
      ],
    },
  })
  async findAll(): Promise<Paper[]> {
    return this.paperService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um paper por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paper encontrado.',
    schema: {
      example: {
        id: 1,
        titulo: 'Título do Paper',
        url: 'https://exemplo.com/paper.pdf',
        pdf: null,
        referencia: 'Referência bibliográfica',
        deletado_em: null,
        autores: [
          {
            id: 1,
            nome: 'Alan Bianchi',
            email: 'alan@bianchi.com',
            lattes: 'http://lattes.cnpq.br/123456789',
            perfil: 'cliente',
          },
          {
            id: 2,
            nome: 'Maria Silva',
            email: 'maria@silva.com',
            lattes: 'http://lattes.cnpq.br/987654321',
            perfil: 'administrador',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Paper não encontrado' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Paper> {
    return this.paperService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo paper' })
  @ApiBody({
    schema: {
      example: {
        titulo: 'Título do Paper',
        url: 'https://exemplo.com/paper.pdf',
        pdf: null,
        referencia: 'Referência bibliográfica',
        autoresIds: [1, 2],
      },
      properties: {
        titulo: { type: 'string', example: 'Título do Paper' },
        url: { type: 'string', example: 'https://exemplo.com/paper.pdf' },
        pdf: { type: 'string', format: 'binary', nullable: true },
        referencia: { type: 'string', example: 'Referência bibliográfica' },
        autoresIds: {
          type: 'array',
          items: { type: 'integer' },
          example: [1, 2],
        },
      },
      required: ['titulo'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Paper criado com sucesso.',
    schema: {
      example: {
        id: 1,
        titulo: 'Título do Paper',
        url: 'https://exemplo.com/paper.pdf',
        pdf: null,
        referencia: 'Referência bibliográfica',
        deletado_em: null,
        autores: [
          {
            id: 1,
            nome: 'Alan Bianchi',
            email: 'alan@bianchi.com',
            lattes: 'http://lattes.cnpq.br/123456789',
            perfil: 'cliente',
          },
          {
            id: 2,
            nome: 'Maria Silva',
            email: 'maria@silva.com',
            lattes: 'http://lattes.cnpq.br/987654321',
            perfil: 'administrador',
          },
        ],
      },
    },
  })
  async create(@Body() data: any): Promise<Paper> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { autoresIds, ...paperData } = data;
    return this.paperService.create(paperData, autoresIds);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um paper' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      example: {
        titulo: 'Novo título',
        url: 'https://exemplo.com/novo.pdf',
        pdf: null,
        referencia: 'Nova referência',
        autoresIds: [1],
      },
      properties: {
        titulo: { type: 'string', example: 'Novo título' },
        url: { type: 'string', example: 'https://exemplo.com/novo.pdf' },
        pdf: { type: 'string', format: 'binary', nullable: true },
        referencia: { type: 'string', example: 'Nova referência' },
        autoresIds: { type: 'array', items: { type: 'integer' }, example: [1] },
      },
      required: ['titulo'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Paper atualizado com sucesso.',
    schema: {
      example: {
        id: 1,
        titulo: 'Novo título',
        url: 'https://exemplo.com/novo.pdf',
        pdf: null,
        referencia: 'Nova referência',
        deletado_em: null,
        autores: [
          {
            id: 1,
            nome: 'Alan Bianchi',
            email: 'alan@bianchi.com',
            lattes: 'http://lattes.cnpq.br/123456789',
            perfil: 'cliente',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Paper não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<Paper> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { autoresIds, ...paperData } = data;
    return this.paperService.update(id, paperData, autoresIds);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um paper' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Paper removido' })
  @ApiResponse({ status: 404, description: 'Paper não encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.paperService.delete(id);
  }
}

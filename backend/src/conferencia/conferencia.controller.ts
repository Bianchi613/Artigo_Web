import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ConferenciaService } from './conferencia.service';
import { Conferencia } from './conferencia.model';

@ApiTags('Conferência')
@Controller('conferencia')
export class ConferenciaController {
  constructor(private readonly conferenciaService: ConferenciaService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as conferências' })
  @ApiResponse({
    status: 200,
    description: 'Lista de conferências',
    schema: {
      example: [
        {
          id: 1,
          titulo: 'SBRC 2025',
          url: 'https://sbrc.org.br',
          data: '2025-05-10',
          atualizado_em: '2025-06-27T12:00:00Z',
        },
      ],
    },
  })
  findAll() {
    return this.conferenciaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma conferência por ID' })
  @ApiResponse({
    status: 200,
    description: 'Conferência encontrada',
    schema: {
      example: {
        id: 1,
        titulo: 'SBRC 2025',
        url: 'https://sbrc.org.br',
        data: '2025-05-10',
        atualizado_em: '2025-06-27T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Conferência não encontrada' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.conferenciaService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova conferência' })
  @ApiBody({
    schema: {
      example: {
        titulo: 'SBRC 2025',
        url: 'https://sbrc.org.br',
        data: '2025-05-10',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Conferência criada com sucesso',
    schema: {
      example: {
        id: 1,
        titulo: 'SBRC 2025',
        url: 'https://sbrc.org.br',
        data: '2025-05-10',
        atualizado_em: '2025-06-27T12:00:00Z',
      },
    },
  })
  create(@Body() data: Partial<Conferencia>) {
    return this.conferenciaService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma conferência' })
  @ApiBody({
    schema: {
      example: {
        titulo: 'SBRC 2025 - Atualizada',
        url: 'https://sbrc.org.br/2025',
        data: '2025-05-12',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Conferência atualizada',
    schema: {
      example: {
        id: 1,
        titulo: 'SBRC 2025 - Atualizada',
        url: 'https://sbrc.org.br/2025',
        data: '2025-05-12',
        atualizado_em: '2025-06-27T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Conferência não encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Conferencia>,
  ) {
    return this.conferenciaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma conferência' })
  @ApiResponse({ status: 204, description: 'Conferência removida' })
  @ApiResponse({ status: 404, description: 'Conferência não encontrada' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.conferenciaService.delete(id);
  }
}

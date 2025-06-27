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
import { PaperConfService } from './paper_conf.service';
import { PaperConf } from './paper_conf.model';

@ApiTags('PaperConf')
@Controller('paper-conf')
export class PaperConfController {
  constructor(private readonly paperConfService: PaperConfService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todas as submissões de paper em conferências',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de submissões',
    schema: {
      example: [
        {
          id: 1,
          paper_id: 2,
          conferencia_id: 1,
          status: 'em avaliacao',
          data_submissao: '2025-06-01',
          atualizado_em: '2025-06-27T12:00:00Z',
        },
      ],
    },
  })
  findAll() {
    return this.paperConfService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma submissão por ID' })
  @ApiResponse({
    status: 200,
    description: 'Submissão encontrada',
    schema: {
      example: {
        id: 1,
        paper_id: 2,
        conferencia_id: 1,
        status: 'em avaliacao',
        data_submissao: '2025-06-01',
        atualizado_em: '2025-06-27T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Submissão não encontrada' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.paperConfService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova submissão de paper em conferência' })
  @ApiBody({
    schema: {
      example: {
        paper_id: 2,
        conferencia_id: 1,
        status: 'em avaliacao',
        data_submissao: '2025-06-01',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Submissão criada com sucesso',
    schema: {
      example: {
        id: 1,
        paper_id: 2,
        conferencia_id: 1,
        status: 'em avaliacao',
        data_submissao: '2025-06-01',
        atualizado_em: '2025-06-27T12:00:00Z',
      },
    },
  })
  create(@Body() data: Partial<PaperConf>) {
    return this.paperConfService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma submissão de paper em conferência' })
  @ApiBody({
    schema: { example: { status: 'aceito', data_submissao: '2025-06-10' } },
  })
  @ApiResponse({
    status: 200,
    description: 'Submissão atualizada',
    schema: {
      example: {
        id: 1,
        paper_id: 2,
        conferencia_id: 1,
        status: 'aceito',
        data_submissao: '2025-06-10',
        atualizado_em: '2025-06-27T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Submissão não encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<PaperConf>,
  ) {
    return this.paperConfService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma submissão de paper em conferência' })
  @ApiResponse({ status: 204, description: 'Submissão removida' })
  @ApiResponse({ status: 404, description: 'Submissão não encontrada' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.paperConfService.delete(id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateSolditemDto } from './create-solditem.dto';

export class UpdateSolditemDto extends PartialType(CreateSolditemDto) {}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { loginAuthDto } from './loginAuth.dto';

export class registerAuthDto extends PartialType(loginAuthDto) {
  @ApiProperty({ description: 'Email', example: 'mail@amail.com' })
  email: string;
}

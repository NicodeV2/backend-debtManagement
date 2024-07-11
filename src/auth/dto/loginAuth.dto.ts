import { ApiProperty } from '@nestjs/swagger';

export class loginAuthDto {
  @ApiProperty({ description: 'Username', example: 'user1' })
  username: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  password: string;
}

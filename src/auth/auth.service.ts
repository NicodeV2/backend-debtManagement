import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { registerAuthDto } from './dto/registerAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { loginAuthDto } from './dto/loginAuth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async registerAuth(authObject: registerAuthDto) {
    const { password } = authObject;
    //validate max length of username 25
    //return default error message if username length is more than 25

    const plainToHash = await hash(password, 10);
    authObject = { ...authObject, password: plainToHash };
    const newAuth = this.usersRepository.create(authObject);
    const newUser = await this.usersRepository.save(newAuth);

    return newUser;
  }

  async loginAuth(authObject: loginAuthDto) {
    const { username, password } = authObject;
    const userSelect = this.usersRepository
      .createQueryBuilder('u')
      .select('u.id_user', 'id_user')
      .addSelect('u.username', 'username')
      .addSelect('u.email', 'email')
      .addSelect('u.password', 'password')
      .where('u.username = :username', { username });
    const userResult = await userSelect.getRawOne();
    console.log(userResult);
    if (!userResult) {
      throw new HttpException('User not found', 404);
    }

    const isPassword = await compare(password, userResult.password);
    if (!isPassword) {
      throw new HttpException('Invalid credentials', 401);
    }

    const payload = { id: userResult.id_user, username: userResult.username };
    const token = this.jwtService.sign(payload);
    const returnData = {
      id_user: userResult.id_user,
      username: userResult.username,
      email: userResult.email,
      token,
    };

    return returnData;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role: 'Client',
    });
    return this.userRepository.save(user);
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = await this.generateToken({ id: user.id, username: user.username, role: user.role });
    return { access_token: token };
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
}
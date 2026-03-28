import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth()
  async getMe(@Req() req: any) {
    return {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    };
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiBearerAuth()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  @ApiBearerAuth()
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user (Admin only)' })
  @ApiBearerAuth()
  async updateUser(@Param('id') id: string, @Body() userData: any) {
    return this.userService.updateUser(Number(id), userData);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
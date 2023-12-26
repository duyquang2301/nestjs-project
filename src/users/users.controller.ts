import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private mailService: MailerService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    await this.mailService.sendMail({
      to: createUserDto.email,
      subject: 'wellcome',
      template: './wellcome',
      context: {
        name: createUserDto.firstName,
      },
    });
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    const user = await this.usersService.findAll();

    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageProfile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.uploadImageProfile(id, file);
  }
}

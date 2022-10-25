import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModule: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.UserModule(createUserDto);
    return user.save();
  }

  findAll() {
    return this.UserModule.find();
  }

  findOne(id: string) {
    return this.UserModule.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModule.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.UserModule.deleteOne({
      _id: id,
    }).exec;
  }
}

import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UserService } from 'src/modules/user';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ){}
    async login(loginDto: LoginDto){
        const user = await this.userService.getUser({email: loginDto.email})
        if (user) {
            const isPasswordMatch = bcrypt.compare(loginDto.password, user.password)
            console.log(isPasswordMatch) 
             
        }
    }
}

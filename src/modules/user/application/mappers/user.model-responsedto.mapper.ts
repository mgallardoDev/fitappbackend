import { Injectable } from "@nestjs/common";
import { User } from "../../domain/models/user.model";
import { UserResponseDto } from "../dtos/user-response.dto"

@Injectable()
export class UserModelDtoMapper {

    toUserDto(user: User): UserResponseDto {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }

}
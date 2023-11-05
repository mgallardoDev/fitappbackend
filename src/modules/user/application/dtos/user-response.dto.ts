import { BaseResponse as BaseResponseDto } from 'src/common/application/api-responses/base.response';
import { Role } from '../../domain/models/role.model';
import { Food, Meal, UserGoal } from 'src/domain/models';

export class UserResponseDto extends BaseResponseDto {
  public name: string;
  public email: string;
  public role: Role;
  public readonly uid?: string | null;
  public readonly createdAt?: Date | null;
  public readonly enabled?: boolean | null;
  public ownFoods?: Food[];
  public ownMeals?: Meal[];
  public goals?: UserGoal[];
}

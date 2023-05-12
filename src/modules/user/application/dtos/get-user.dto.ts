import { IsEmail, IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { ValidateOneAndOnlyOneParam } from 'src/common/application/validators/only-one-param.validator';

// @ValidateOneAndOnlyOneParam(['email', 'uid'])
export class GetUserDto {
  @ValidateOneAndOnlyOneParam(['email', 'uid'])
  @IsEmail()
  @ValidateIf(o => o.email !== undefined)
  email?: string;

  @IsOptional()
  @IsUUID()
  @ValidateIf(o => o.uid !== undefined)
  uid?: string;
}

import { IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  id: string;
}

import { IsString, IsUrl } from 'class-validator'

export class CreateStreamDto {
  @IsString()
  public name: string;

  @IsUrl()
  public logo: string;

  @IsString()
  public group: string;

  @IsUrl()
  public url: string;

  @IsString()
  public raw: string;
}

export class UpdateStreamDto {
  @IsString()
  public name: string;

  @IsString()
  public logo: string;

  @IsString()
  public group: string;

  @IsString()
  public url: string;

  @IsString()
  public raw: string;
}
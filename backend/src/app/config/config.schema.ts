import { Type } from 'class-transformer'
import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from 'class-validator'

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  readonly host: string

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly port: number = 5432

  @IsString()
  @IsNotEmpty()
  readonly database: string = 'postgres'

  @IsString()
  @IsNotEmpty()
  readonly username: string = 'postgres'

  @IsString()
  @IsDefined()
  readonly password: string = ''
}

export class GithubConfig {
  @IsString()
  @IsNotEmpty()
  readonly hookSecret: string
}

export class ApplicationConfig {
  @IsDefined()
  @ValidateNested()
  @Type(() => DatabaseConfig)
  readonly database: DatabaseConfig

  @IsDefined()
  @ValidateNested()
  @Type(() => GithubConfig)
  readonly github: GithubConfig
}

export interface Version {
  version: string | null

  branch: string | null

  commit: string | null

  buildTime: string | null
}

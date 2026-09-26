import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Matches,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';

class EnvironmentVariables {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsNotEmpty()
  DATABASE_URL: string;

  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  // One or more origins separated by commas, e.g. "https://example.com,https://www.example.com".
  @IsOptional()
  @Matches(/^\s*https?:\/\/[^\s,/]+\/?\s*(,\s*https?:\/\/[^\s,/]+\/?\s*)*$/, {
    message:
      'CORS_ORIGIN doit contenir une ou plusieurs origines séparées par des virgules, chacune commençant par http:// ou https:// (ex. https://example.com).',
  })
  CORS_ORIGIN?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Configuration invalide au démarrage:\n${errors
        .map((error) => Object.values(error.constraints ?? {}).join(', '))
        .join('\n')}`,
    );
  }

  return validatedConfig;
}

import { BadRequestException, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const uploadDir = join(
          process.cwd(),
          configService.get<string>('upload.dir') ?? './uploads',
          'applications',
        );

        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true });
        }

        return {
          storage: diskStorage({
            destination: uploadDir,
            filename: (_req, _file, callback) => callback(null, `${randomUUID()}.pdf`),
          }),
          fileFilter: (_req, file, callback) => {
            const isPdf =
              file.mimetype === 'application/pdf' &&
              extname(file.originalname).toLowerCase() === '.pdf';

            if (!isPdf) {
              callback(new BadRequestException('Seuls les fichiers PDF sont acceptés.'), false);
              return;
            }

            callback(null, true);
          },
          limits: {
            fileSize: configService.get<number>('upload.maxFileSize'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}

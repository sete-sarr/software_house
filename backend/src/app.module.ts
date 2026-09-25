import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { ContactModule } from './modules/contact/contact.module';
import { ServicesModule } from './modules/services/services.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TeamModule } from './modules/team/team.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
      },
    ]),
    PrismaModule,
    HealthModule,
    MailModule,
    ApplicationsModule,
    ContactModule,
    ServicesModule,
    AuthModule,
    ProjectsModule,
    TeamModule,
    TestimonialsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

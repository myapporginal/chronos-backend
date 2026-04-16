import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = (
    configService: ConfigService
): TypeOrmModuleOptions => {
    const isProd = configService.get<string>('NODE_ENV') === 'production';

    return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        // Entities
        entities: [
            isProd
                ? 'dist/**/*.entity.{js,ts}'
                : 'src/**/*.entity.{js,ts}'
        ],

        // Migrations
        migrations: [
            isProd
                ? 'dist/migrations/*.{js,ts}'
                : 'migrations/*.{js,ts}'
        ],
        
        // Never use synchronize: true in production
        synchronize: !isProd,
        
        // Execute migrations automatically on startup (only in development)
        migrationsRun: !isProd,

        // Logging
        logging: !isProd
    };
};
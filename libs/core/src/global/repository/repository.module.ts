import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TYPEORM_EX_CUSTOM_REPOSITORY } from '../decorator/repository.decorator';

export class RepositoryModule {
  public static forFeatures<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];
    const entities = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(
        TYPEORM_EX_CUSTOM_REPOSITORY,
        repository,
      );

      if (!entity) {
        continue;
      }
      entities.push(entity);

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository =
            dataSource.getRepository<typeof entity>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    const typeOrmModule = TypeOrmModule.forFeature(entities);

    return {
      imports: [typeOrmModule],
      exports: [typeOrmModule, ...providers],
      module: RepositoryModule,
      providers,
    };
  }
}

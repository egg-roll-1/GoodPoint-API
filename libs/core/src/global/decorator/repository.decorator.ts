import { SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

/**
 * Repository를 커스텀하여 만들기 위한 데코레이터
 * @param entity
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const CustomRepository = (entity: Function) =>
  SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);

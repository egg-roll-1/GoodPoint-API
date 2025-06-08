import { Module } from '@nestjs/common';
import { GeoService } from './geo.service';

@Module({
  imports: [],
  providers: [GeoService],
  exports: [GeoService],
})
export class OpenAPIModule {}

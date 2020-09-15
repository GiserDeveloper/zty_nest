import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from './schema/counter.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }])],
})
export class CounterModule {}

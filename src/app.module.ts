import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
	imports: [
		GraphQLModule.forRoot({
			context: ({ req }) => ({ req }),
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
      },
      installSubscriptionHandlers: true,
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

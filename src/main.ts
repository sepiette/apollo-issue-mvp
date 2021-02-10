import { AllExceptionsFilter } from './filters/all-exception.filter';
import { AppModule } from './app.module';
import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

    // ROBOTS.TXT & Favicon
    app.use('/favicon.ico', function (req, res) {
      res.sendStatus(HttpStatus.NO_CONTENT);
    });
  
    app.use('/robots.txt', function (req, res) {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /');
    });
    
	app.useGlobalFilters(new AllExceptionsFilter());

	await app.listen(4000);
}
bootstrap();

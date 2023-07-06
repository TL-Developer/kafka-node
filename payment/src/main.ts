import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kafka from 'kafka-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
  const producer = new kafka.Producer(client);
  const KeyedMessage = kafka.KeyedMessage;
  const km = new KeyedMessage('key', 'message');
  const payloads = [
    { topic: 'test', messages: 'hi', partition: 0 },
    { topic: 'topic2', messages: ['hello', 'world', km] },
  ];

  producer.on('ready', function () {
    console.log('Producer is ready');
    producer.send(payloads, function (err, data) {
      console.log(data);
    });
  });

  producer.on('error', function (err) {
    console.log('Producer is in error state');
  });

  await app.listen(3001);
}
bootstrap();

import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RegistrationService } from '../registration/registration.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LeaderboardGateway implements OnGatewayConnection {
  private readonly logger = new Logger(LeaderboardGateway.name);
  constructor(private readonly registrationService: RegistrationService) {}
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    client.on('subscribe', (quizCode: string) => {
      this.handleSubscribeEvent(client, quizCode);
    });
    client.on('unsubscribe', (data: { quizCode: string; userCode: string }) => {
      this.handleUnsubscribeEvent(client, data);
    });
  }
  async handleUnsubscribeEvent(
    client: Socket,
    data: { quizCode: string; userCode: string },
  ) {
    this.logger.log(`User ${data.userCode} is leaving quiz ${data.quizCode}`);
    await this.registrationService.leave(data);
    await client.leave(data.quizCode);
  }

  async handleSubscribeEvent(client: Socket, quizCode: string) {
    this.logger.log(`New client is subscribing to ${quizCode}`);
    await client.join(quizCode);
  }

  emitUpdateLeaderboardEvent(
    quizCode: string,
    newBoard: Array<{ userCode: string; point: number }>,
  ) {
    return this.server.to(quizCode).emit('update-leaderboard', newBoard);
  }
}

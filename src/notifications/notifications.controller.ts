import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('test')
  async test(
    @Body()
    body: {
      tokens: string[];
      message: string;
      data?: object;
      title?: string;
      subtitle?: string;
      sound?: string;
      badge?: number;
      priority?: 'default' | 'normal' | 'high';
      channelId?: string;
      image?: string;
    },
  ) {
    const { message, tokens, data, title, subtitle } = body;
    return await this.notificationsService.sendPushNotification(
      tokens,
      message,
      data,
      title,
      subtitle,
    );
  }
}

// notifications.service.ts
import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

  async sendPushNotification(
    targetTokens: string[],
    message: string,
    data?: object,
    title?: string,
    subtitle?: string,
    sound?: 'default' | null,
    badge?: number,
    priority?: 'default' | 'normal' | 'high',
    channelId?: string,
    image?: string,
  ): Promise<ExpoPushTicket[]> {
    const messages: ExpoPushMessage[] = [];

    for (const pushToken of targetTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} no es válido.`);
        continue;
      }

      messages.push({
        to: pushToken,
        sound: sound ?? 'default',
        body: message,
        data,
        title,
        subtitle,
        badge,
        priority,
        channelId, // Para mostrar imágenes en las notificaciones
      });
    }

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error al enviar notificaciones:', error);
      }
    }

    return tickets;
  }
}

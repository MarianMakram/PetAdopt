import * as signalR from '@microsoft/signalr';

class SignalRService {
  connection = null;

  async startConnection() {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7001/hubs/notifications', {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log('SignalR Connected.');
    } catch (err) {
      console.error('SignalR Connection Error: ', err);
    }
  }

  onReceiveNotification(callback) {
    if (this.connection) {
      this.connection.on('ReceiveNotification', callback);
    }
  }

  stopConnection() {
    if (this.connection) {
      this.connection.stop();
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;

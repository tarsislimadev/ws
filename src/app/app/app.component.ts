import { Component } from '@angular/core';

// services
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'WebSocket Client';

  protocol = 'ws://';
  host = 'echo.websocket.org';

  message = '';

  get url(): string {
    return this.protocol + this.host;
  }

  constructor(
    public socket: SocketService,
  ) { }

  toggleProtocol(): void {
    this.protocol = this.protocol === 'ws://' ? 'wss://' :  'ws://';
  }

  connect(): void {
    this.socket.url = this.url;
  }

  send(): void {
    this.socket.send(this.message);
    this.message = '';
  }

}

import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({ providedIn: 'root' })
export class SocketService {

  private socket: WebSocket = undefined;
  private m: Message[] = [];
  status: string;

  constructor() {
    this.message = '[ready]';
  }

  set url(url: string) {
    if (this.socket !== undefined) {
      this.socket.close();
    }

    this.socket = new window.WebSocket(url);

    this.socket.onopen = event => this.onOpen(event);
    this.socket.onmessage = event => this.onMessage(event);
    this.socket.onerror = event => this.onError(event);
    this.socket.onclose = event => this.onClose(event);
  }

  private set message(message: string) {
    console.log('message', message);
    this.m.push(new Message(message));
  }

  get messages(): Message[] {
    return this.m;
  }

  onOpen(event: any): void {
    console.log('socket open', event);
    this.message = '[opened] ' + event.target.url;
    this.status = 'online';
  }

  onMessage(event: any): void {
    console.log('socket message', event);
    this.message = '[received] ' + event.data;
  }

  onError(event: any): void {
    console.log('socket error', event);
    this.message = '[error]';
    this.status = 'error';
  }

  onClose(event: any): void {
    console.log('socket close', event);
    this.message = '[closed] ' + event.target.url;
    this.status = 'offline';
  }

  send(message: string): void {
    if (this.socket) {
      console.log('socket send', message);
      this.socket.send(message);
      this.message = '[sended] ' + message;
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

}

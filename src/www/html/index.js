import { HTML, nFlex } from '@brtmvdl/frontend'
import { InputTextGroupComponent, ButtonComponent } from './components/index.js'

export class TextHTML extends HTML {
  text = null

  constructor(text = '') {
    super()
    this.text = text
  }

  onCreate() {
    this.setText(this.text)
  }
}

export class Page extends HTML {
  state = {
    socket: undefined,
  }

  children = {
    url: new InputTextGroupComponent(),
    connect: new ButtonComponent(),
    message: new InputTextGroupComponent(),
    send: new ButtonComponent(),
    messages: new HTML(),
  }

  onCreate() {
    const flex = new nFlex()
    flex.append(this.getNav())
    flex.append(this.getMain())
    this.append(flex)
    this.append(this.getMessagesHTML())
  }

  setWebSocket(url) {
    if (this.state.socket !== undefined) {
      this.state.socket.close()
    }

    this.state.socket = new window.WebSocket(url)

    this.state.socket.onopen = event => this.onOpen(event)
    this.state.socket.onmessage = event => this.onMessage(event)
    this.state.socket.onerror = event => this.onError(event)
    this.state.socket.onclose = event => this.onClose(event)
  }

  onOpen(event) {
    console.log('onOpen', event)
  }

  onMessage(event) {
    console.log('onMessage', event)
    this.children.messages.append(new TextHTML(event.data))
  }

  onError(event) {
    console.log('onError', event)
  }

  onOpen(event) {
    console.log('onOpen', event)
  }

  getNav() {
    const nav = new nFlex()
    nav.append(this.getUrlInput())
    nav.append(this.getConnectButton())
    return nav
  }

  getUrlInput() {
    this.children.url.children.input.setPlaceholder('url')
    return this.children.url
  }

  getConnectButton() {
    this.children.connect.setText('connect')
    this.children.connect.on('click', () => this.onConnect())
    return this.children.connect
  }

  onConnect() {
    this.setWebSocket(this.children.url.getValue())
  }

  getMain() {
    const main = new nFlex()
    main.append(this.getMessageInput())
    main.append(this.getSendButton())
    return main
  }

  getMessageInput() {
    this.children.message.children.input.setPlaceholder('message')
    return this.children.message
  }

  getSendButton() {
    this.children.send.setText('send')
    this.children.send.on('click', () => this.onSend())
    return this.children.send
  }

  onSend() {
    const message = this.children.message.getValue()
    if (this.state.socket) {
      console.log('socket send', message);
      this.state.socket.send(message);
    } else {
      console.log('no socket to send', message);
    }
  }

  getMessagesHTML() {
    return this.children.messages
  }
}

export class Message {
  date: string;

  constructor(public message: string) {
    this.date = (new Date()).toLocaleString();
  }
}

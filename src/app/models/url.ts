export class Url {

  constructor(
    public url: string,
  ) { }

  get protocol(): string {
    const parts = this.url.split('://');
    return (parts.length > 1 ? parts[0] : 'ws') + '://';
  }

  get path(): string {
    const parts = this.url.split('://');
    return parts.length > 1 ? parts.filter((s, ix) => ix !== 0).join('') : this.url;
  }

}

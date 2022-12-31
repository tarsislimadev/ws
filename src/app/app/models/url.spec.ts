import { Url } from './url';

describe('Url', () => {
  it('should create an instance', () => {
    expect(new Url('wss://echo.websocket.org')).toBeTruthy();
  });
});

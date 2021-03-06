import { parse } from './iframe-message-parser';

describe('Iframe Message Parser', () => {
  it('parses http request snippet correctly', () => {
    const message = `POST https://graph.microsoft.com/beta/me/calendars
Content-type: application/json
Prefer: A-timezone

{ "name": "Volunteer" }`;

    const parsed = parse(message);
    expect(parsed).toEqual({
      verb: 'POST',
      url: 'https://graph.microsoft.com/beta/me/calendars',
      headers: [
        { 'Content-type': 'application/json' },
        { 'Prefer': 'A-timezone' }
      ],
      body: '{ "name": "Volunteer" } '
    });
  });

  it('parses http request snippet without a domain correctly', () => {
    const message = `POST /me/calendars
Content-type: application/json
Prefer: A-timezone

{ "name": "Volunteer" }`;

    const parsed = parse(message);
    expect(parsed).toEqual({
      verb: 'POST',
      url: 'https://graph.microsoft.com/v1.0/me/calendars',
      headers: [
        { 'Content-type': 'application/json' },
        { 'Prefer': 'A-timezone' }
      ],
      body: '{ "name": "Volunteer" } '
    });
  });
});

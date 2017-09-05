var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate message object', () => {
    var from = 'Dan';
    var text = 'Some msg';
    var msg = generateMessage(from, text);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Dan';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var msg = generateLocationMessage(from, latitude, longitude);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, url});
  });
});

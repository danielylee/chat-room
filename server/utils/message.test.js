var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate message object', () => {
    var from = 'Dan';
    var text = 'Some msg';
    var msg = generateMessage(from, text);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, text});
  });
});

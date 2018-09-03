var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMesage', () => {
    it('should generate correct message object', () => {
        var from = 'asdada';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});
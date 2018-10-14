const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate a message object', () => {

        let from = 'testUser';
        let text = 'testText';

        let message = generateMessage(from, text);
        
        expect(message.createdAt).toBeTruthy();
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    });
});
/* eslint-disable no-console */
import { jest } from '@jest/globals';
import logger from './logger';

describe('logger function', () => {
    beforeAll(() => {
        console.log = jest.fn();
    });
    it('should attach the message', () => {
        logger('test-endpoint')('Request with');
        expect(console.log).toHaveBeenCalledWith(
            '[test-endpoint] Request with'
        );
    });
    it('should attach the message and the object', () => {
        logger('test-endpoint')('Request with', {
            params: { param1: 'param1' },
        });
        expect(console.log).toHaveBeenCalledWith(
            '[test-endpoint] Request with',
            { params: { param1: 'param1' } }
        );
    });
});

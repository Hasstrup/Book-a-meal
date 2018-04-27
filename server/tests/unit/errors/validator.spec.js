import { expect } from 'chai';
import ValidatorError from '../../../services/auth/errors/validation';

describe('Custom Validation Error', () => {
  const err = new ValidatorError('Unprocessable request', 422);
  it('should have correct messages and status', () => {
    expect(err.message).to.equal('Unprocessable request');
    expect(err.status).to.equal(422);
  });
});

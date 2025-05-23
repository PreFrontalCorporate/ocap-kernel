import { describe, it, expect } from 'vitest';

import { VatNotFoundError } from './VatNotFoundError.ts';
import { ErrorCode, ErrorSentinel } from '../constants.ts';
import { unmarshalErrorOptions } from '../marshal/unmarshalError.ts';
import type { MarshaledOcapError } from '../types.ts';

describe('VatNotFoundError', () => {
  const mockVatId = 'mockVatId';

  it('creates a VatNotFoundError with the correct properties', () => {
    const error = new VatNotFoundError(mockVatId);
    expect(error).toBeInstanceOf(VatNotFoundError);
    expect(error.code).toBe(ErrorCode.VatNotFound);
    expect(error.message).toBe('Vat does not exist.');
    expect(error.data).toStrictEqual({ vatId: mockVatId });
    expect(error.cause).toBeUndefined();
  });

  it('unmarshals a valid marshaled error', () => {
    const marshaledError: MarshaledOcapError = {
      [ErrorSentinel]: true,
      message: 'Vat does not exist.',
      code: ErrorCode.VatNotFound,
      data: { vatId: mockVatId },
      stack: 'stack trace',
    };

    const unmarshaledError = VatNotFoundError.unmarshal(
      marshaledError,
      unmarshalErrorOptions,
    );
    expect(unmarshaledError).toBeInstanceOf(VatNotFoundError);
    expect(unmarshaledError.code).toBe(ErrorCode.VatNotFound);
    expect(unmarshaledError.message).toBe('Vat does not exist.');
    expect(unmarshaledError.stack).toBe('stack trace');
    expect(unmarshaledError.data).toStrictEqual({
      vatId: mockVatId,
    });
  });

  it('throws an error when an invalid message is unmarshaled', () => {
    const marshaledError: MarshaledOcapError = {
      [ErrorSentinel]: true,
      message: 'Vat does not exist.',
      code: ErrorCode.VatNotFound,
      data: '{ vatId: mockVatId }',
      stack: 'stack trace',
    };

    expect(() =>
      VatNotFoundError.unmarshal(marshaledError, unmarshalErrorOptions),
    ).toThrow(
      'At path: data -- Expected an object, but received: "{ vatId: mockVatId }"',
    );
  });
});

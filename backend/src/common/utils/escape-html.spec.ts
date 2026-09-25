import { escapeHtml } from './escape-html';

describe('escapeHtml', () => {
  it('escapes all HTML-sensitive characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('escapes ampersands and single quotes', () => {
    expect(escapeHtml(`Tom & Jerry's`)).toBe('Tom &amp; Jerry&#39;s');
  });

  it('leaves plain text untouched', () => {
    expect(escapeHtml('Jean Dupont')).toBe('Jean Dupont');
  });

  it('leaves accented characters untouched', () => {
    expect(escapeHtml('Développement web sécurisé')).toBe('Développement web sécurisé');
  });

  it('handles an empty string', () => {
    expect(escapeHtml('')).toBe('');
  });
});

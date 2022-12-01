import assert from 'node:assert';

// [console.assert not throwing with v22.4.0](https://github.com/facebook/jest/issues/5634)
// eslint-disable-next-line no-console
console.assert = assert;

/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const fetchPolyfill = process.env.FETCH;
switch (fetchPolyfill) {
  case 'whatwg-fetch': {
    const whatwgFetch = require('whatwg-fetch');
    globalThis.fetch = whatwgFetch.fetch;
    globalThis.Request = whatwgFetch.Request;
    globalThis.Response = whatwgFetch.Response;
    globalThis.Headers = whatwgFetch.Headers;
    break;
  }
  case 'node-fetch': {
    const nodeFetch = require('node-fetch');
    globalThis.fetch = nodeFetch.default;
    globalThis.Request = nodeFetch.Request;
    globalThis.Response = nodeFetch.Response;
    globalThis.Headers = nodeFetch.Headers;
    break;
  }
  case 'undici': {
    const undici = require('undici');
    globalThis.fetch = undici.fetch;
    globalThis.Request = undici.Request;
    globalThis.Response = undici.Response;
    globalThis.Headers = undici.Headers;
    break;
  }
  default: {
    assert(false, `Invalid fetch polyfill: '${fetchPolyfill}'`);
  }
}
/* eslint-enable global-require, @typescript-eslint/no-var-requires */

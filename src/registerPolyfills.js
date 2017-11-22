import Promise from 'promise-polyfill';
import 'whatwg-fetch';

export default function registerPolyfills() {
  if (!window.Promise) {
    window.Promise = Promise;
  }
}

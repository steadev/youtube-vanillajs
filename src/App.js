import Hello from './components/Hello.js';

export default class App {
  constructor($target) {
    const hello = new Hello({
      $target
    });
  }
}
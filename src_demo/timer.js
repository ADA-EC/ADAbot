let idleMessageTime = 1.08e7;

let Timer = function Timer(func, t) {

  let timer = setInterval(func, t);
  
  this.stop = () => {
      if (timer) {
          clearInterval(timer);
          timer = null;
      }
      return this;
  }

  this.start = () => {
      if (!timer) {
          this.stop();
          timer = setInterval(func, t);
      }
      return this;
  }

  // start with new or original interval, stop current interval
  this.reset = (T = t) => {
      t = T;
      return this.stop().start();
  }
}

module.exports = Timer;
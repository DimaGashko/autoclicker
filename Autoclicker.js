class Autoclicker {
   interval = 1000;

   /** @type {HTMLElement[]} */
   _targets = [];

   _wordsTimer = 0;
   _curIndex = -1;

   constructor() {
      this._initEvents();
   }

   start() {
      this.stop();

      const autoclicker = this;

      this._wordsTimer = setTimeout(function step() {
         autoclicker.next();
         autoclicker._wordsTimer = setTimeout(step, autoclicker.interval);
      }, this.interval);
   }

   stop() {
      clearInterval(this._wordsTimer);
      this._wordsTimer = 0;
   }

   next() {
      if (!this._targets.length) return;

      this._curIndex = (this._curIndex + 1) % this._targets.length;
      this._targets[this._curIndex].dispatchEvent(new MouseEvent('click'));
   }

   _initEvents() {
      document.body.addEventListener('click', ({ target, altKey }) => {
         if (!altKey) return;
         this._targets.push(target);
         console.log('Words is added');
      });
   }

}

autoclicker = new Autoclicker();
autoclicker.start();
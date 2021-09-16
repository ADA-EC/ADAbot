// Esse codigo manda mensagens com um delay, mas se alguem mandar uma 
// mensagem enquanto esta nesse delay, o timer reseta

// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

venom
  .create()
  .then((client) => {
    start(client)
  })
  .catch((erro) => {
    console.log(erro);
  });

const ADAid = 'XXX-XXXg.us'; // ID do grupo desejado
const botNumber = 'XXX'; // numero do bot
const idleMessageTime = 10000; // 10 segundos entre mensagens

function Timer(func, t) {

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

function start(client) {
  
  let messageTimer = new Timer(() => {
    //client.sendText(ADAid, 'Voces sabem que sao meus unicos amigos? 😭');
    console.log("mandaria uma mensagem no grupo")
}, idleMessageTime);

  client.onMessage((message) => { 
    //if(message.from === ADAid){
    console.log("mandaram uma mensagem no grupo, resetando timer");
    messageTimer.reset(idleMessageTime)
    //}
  });

}

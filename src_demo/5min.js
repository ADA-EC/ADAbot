const venom = require('venom-bot');


venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  async function start(client) {
    client.onMessage((message) => {
      if (message.body === 'Hi' && message.isGroupMsg === false) {
        client
          .sendText(message.from, 'Welcome Venom 🕷')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
    });
    client.sendText('5516992027508-1623887349@g.us', 'Voces sabem que sao meus unicos amigos? 😭');
      console.log("mandaria uma mensagem no grupo");
}


const venom = require('venom-bot');

const Timer = require("./timer.js");

const Bingo = require("./bingo.js");

const {getEvents, fullDate} = require("./google_calendar.js");

let idleMessageTime = 1.0e7;

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  async function get_events(){
	
    let start = fullDate(0);
  
    let end = fullDate(1);
    
    console.log("start: " + start + " end: " + end);
    getEvents(start, end).then((res) => {
    console.log(res);
    info = res;
    try {
      console.log(info[0]["summary"]);
      client
.sendText('5516992027508-1623887349@g.us', "Proximo: " + info[0]["summary"])
.then((result) => {
  //console.log('Result: ', result); //return object success
})
.catch((erro) => {
  console.error('Error when sending: ', erro); //return object error
});
      if(info[0] != null)
       return res[0]["summary"];
     } catch(e){
        console.log("Evento nao encontrado: " + e);
           }
       })
       .catch((err) => {
           console.log(err);
       });
  }


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
    
  let bingo = new Bingo(10, 10);
  // prints the content of the last message sent in a chat
  setInterval(async function foo() {
      const Messages = await client.getAllMessagesInChat('5516992027508-1623887349@g.us');
      lastMessage = Messages[Messages.length - 1].body
      console.log(lastMessage);
      console.log(Messages[0]);
      console.log(lastMessage.search("evento"));
  
      if (lastMessage.search("@5516992027508") > -1) {
  
          if (lastMessage.search("evento") > -1) {
              //Implementar o metodo
              get_events();
          } else if (lastMessage.search("help") > -1) {
              client
                  .sendText('5516992027508-1623887349@g.us', "Oi, eu sou o ADABOT. Abaixo você encontrará uma lista de coisas que você pode me pedir:\n" + "=================================")
                  .then((result) => {
                      //console.log('Result: ', result); //return object success
                  })
                  .catch((erro) => {
                      console.error('Error when sending: ', erro); //return object error
                  });
          } else if (lastMessage.search("numero") > -1) {
              let num = bingo.geraNumero(100);
              client
                  .sendText('5516992027508-1623887349@g.us', "Proximo numero do Bingo: " + num)
                  .then((result) => {
                      //console.log('Result: ', result); //return object success
                  })
                  .catch((erro) => {
                      console.error('Error when sending: ', erro); //return object error
                  });
          } else {
              client
                  .sendText('5516992027508-1623887349@g.us', "Desculpe, eu não entendi. Você pode me marcar e escrever 'help' para ver a lista de comandos implementados")
                  .then((result) => {
                      //console.log('Result: ', result); //return object success
                  })
                  .catch((erro) => {
                      console.error('Error when sending: ', erro); //return object error
                  });
          }
      }
  }, 5000);
  
  //Se ficar muito tempo sem mensagem, movimentar o grupo
  
  let messageTimer = new Timer(() => {
      client.sendText('5516992027508-1623887349@g.us', 'Voces sabem que sao meus unicos amigos? 😭');
      console.log("mandaria uma mensagem no grupo")
  }, idleMessageTime);
  
  setInterval(get_events, 8.64e7);
  
  client.onMessage((message) => {
      console.log("mandaram uma mensagem no grupo, resetando timer");
      messageTimer.reset(idleMessageTime)
  });
  
  async function get_events() {
  
      let start = fullDate(0);
  
      let end = fullDate(1);
  
      console.log("start: " + start + " end: " + end);
      getEvents(start, end).then((res) => {
              console.log(res);
              info = res;
              try {
                  console.log(info[0]["summary"]);
                  client
                      .sendText('5516992027508-1623887349@g.us', "Proximo: " + info[0]["summary"])
                      .then((result) => {
                          //console.log('Result: ', result); //return object success
                      })
                      .catch((erro) => {
                          console.error('Error when sending: ', erro); //return object error
                      });
                  if (info[0] != null)
                      return res[0]["summary"];
              } catch (e) {
                  console.log("Evento nao encontrado: " + e);
              }
          })
          .catch((err) => {
              console.log(err);
          });
  }
}

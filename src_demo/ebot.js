//GOOGLE CALENDAR API

const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};


//let start = '2021-01-03T00:00:00.000Z';
//let end = '2021-10-04T00:00:00.000Z';

function fullDate(offset) {
	let date = new Date();
	let year = date.getFullYear();
	let month = ("0" + (date.getMonth() + 1 + offset)).slice(-2);
	let day = ("0" + (date.getDate() + offset)).slice(-2);
	
	return year + "-" + month + "-" + day + "T00:00:00.000Z";
}

/*
	async function get_all_events(dateTimeStart, dateTimeEnd){

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
}
*/

	async function get_events(){
	
	let start = fullDate(0);

	let end = fullDate(1);
	
	console.log("start: " + start + " end: " + end);
	getEvents(start, end).then(function f(res) {
        //console.log(res);
	info = res;
	 try {
	 	console.log(info[0]["summary"]);
		if(info[0] != null)
		 return res[0]["summary"];
	 } catch(e) {
	  	console.log("Evento nao encontrado: " + e);
         }
     })
     .catch((err) => {
         console.log(err);
     });
}


//END GOOGLE CALENDAR API


//TIMER FUNCTION (BY DAVID)

let idleMessageTime = 1.08e7;

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

//BINGO

class Bingo {
  
  constructor(nParticipantes, tamTabela) {
    this.nParticipantes = nParticipantes;
    this.tamTabela = tamTabela;
    this.gerados = [];
  }
  geraNumero(max) {
    while(1) {
      let num = Math.floor(Math.random() * (max - 1) + 1);
      if(this.gerados.indexOf(num) == -1) {
        this.gerados.push(num);
        return num;
      }
    }
  }

  static gerarTabelas(nParticipantes, tamTabela) {}
}

// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
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
/*
  await client
  .sendText('5516992027508-1623887349@g.us', '👋 Hello from venom! Aí, deu certo. Mas não dá pra vocês acreditarem que foi um bot que mandou mesmo kkk')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
*/


    
    let bingo = new Bingo(10, 10);
    // prints the content of the last message sent in a chat
    setInterval(async function foo() {
    const Messages = await client.getAllMessagesInChat('5516992027508-1623887349@g.us');
    lastMessage = Messages[Messages.length - 1].body
    console.log(lastMessage);
    console.log(Messages[0]);
    console.log(lastMessage.search("evento"));
    
    if(lastMessage.search("@5516992027508") > -1) {

    if(lastMessage.search("evento") > -1) {
      //Implementar o metodo
      get_events();
    }else if(lastMessage.search("help") > -1) {
      client
  .sendText('5516992027508-1623887349@g.us', "Oi, eu sou o ADABOT. Abaixo você encontrará uma lista de coisas que você pode me pedir:\n" + "=================================")
  .then((result) => {
    //console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
    } else if(lastMessage.search("numero") > -1) {
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

/*
    async function check_event(){
	console.log("Procurar proximos eventos");
  let fs = require("./get_module.js");
	let summary =  fs.get_events();
	//console.log(summary);
	summary.then(function onSuccess(r){console.log("=========================" + r + "========================"); client
    .sendText('5516992027508-1623887349@g.us', 'proximo evento: ' + r)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });}
	, console.log("erro"));
   };
	*/
    //setInterval(get_events, 5000);

}






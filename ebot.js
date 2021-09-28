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

function fullDate(offset){
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
	getEvents(start, end).then(function f(res){
        //console.log(res);
	info = res;
	 try{
	 	console.log(info[0]["summary"]);
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


//END GOOGLE CALENDAR API















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


    // the ideal code for waiting new messages would be using onMessage
    /*
    // this code prints every message it recieves

    // we could use a symbol like "$" to check if the message is directed to the bot and check if the message came from a certain group using message.from. If it came from ADA we write code for it to do stuff

    client.onMessage((message) => {
        console.log(message.body)
    })
    */


    // prints the content of the last message sent in a chat
    setInterval(async function foo(){
    const Messages = await client.getAllMessagesInChat('5516992027508-1623887349@g.us');
    lastMessage = Messages[Messages.length - 1].body
    console.log(lastMessage);
    console.log(Messages[0]);
    console.log(lastMessage.search("evento"));
    
    if(lastMessage.search("evento") > -1 && lastMessage.search("@5516992027508") > -1){
      //Implementar o metodo
      get_events();
    }else{
      console.log("Deu ruim a funcao nova");
    }
  }, 5000);
  
    


    async function get_events(){
	
      let start = fullDate(0);
    
      let end = fullDate(1);
      
      console.log("start: " + start + " end: " + end);
      getEvents(start, end).then((res) => {
      console.log(res);
      info = res;
       try{
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

async function retrieve(client){
        const Messages = await client.getAllMessagesInChat('5516992027508-1623887349@g.us');
}






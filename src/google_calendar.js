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

let fullDate = function fullDate(offset) {
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
	let function_data = async function get_events(){
	
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


module.exports = {getEvents, fullDate};
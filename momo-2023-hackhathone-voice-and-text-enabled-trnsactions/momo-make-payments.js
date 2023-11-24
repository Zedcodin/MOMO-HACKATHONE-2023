// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
const  axios = require('axios');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const Admin = require('firebase-admin');
let baseUrl = '{for the proxy server}';
const momoTokenUrl = `${baseUrl}/get-momo-token`;
const momoRequestToPayUrl = `${baseUrl}/request-to-pay`;

let momoToken = null;
let momoRes = 202;


Admin.initializeApp();
const db = Admin.firestore();
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  // console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  // console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  
  
  // console.log(agent.parameters);
  // console.log(Amount);
  
 
  function welcome(agent) {
    agent.add(`Momo chatbot`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  const getMomoToken = () => {
  axios({
    method: 'post',
    url: momoTokenUrl,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    data: {
        apiKey: '{}',
        subscriptionKey: '{}',
      },
    
  })
    .then(response => {
      console.log(response.data.momoToken);
      momoToken = response.data.access_token;
      requestToPay();
      //setMomoToken(response.data.momoToken);
    })
    .catch(error => {
      console.error('Error fetching momo token:', error);
      // Handle error as needed
    });
};
  
  const requestToPay = (agent) => {
  // const { total, phone } = req.body;
  const data = {
    total:"1000",
    phone:"0971136978",
  };

  axios({
    method: 'post',
    url: momoRequestToPayUrl,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    data,
  })
    .then(momoResponse => {
      console.log(momoResponse.data);
      //momoRes = 202;
      
      //setMomoResponse(momoResponse.data);
    })
    .catch(error => {
      console.error('Error making momo request to pay:', error);
      // Handle error as needed
    });
};
  
 

  
  
  function test1(agent) {
    
    getMomoToken();
    /*if(!momoToken){
      requestToPay();
    
    }*/
    agent.add(`No`);
    // agent.add(`I'm sorry, can you try again?`);
  }
  
    function makepayment(agent) {
    let timestamp =  Admin.firestore.FieldValue.serverTimestamp();
    const params = agent.getContext('make_payments-followup').parameters;
    let fooditem =  params.fooditem;
    let size =  params.size;
    let quantity =  params.quantity;
    let fname =  params.fname;
    let phone =  params.phone;
    let total = 0;
    if(size == "small"){
    let shawarmaPrize = 30 * quantity;
    let orderDetailes = {fname:fname,phone:phone,subTotal:shawarmaPrize,size:size,timestamp:timestamp};
    db.collection('orders').add(orderDetailes);
    getMomoToken();
    agent.add(`you have ordered ${quantity} small shawarma your subTotal is k${shawarmaPrize} momoRes ${momoRes}`);

    
    
    } else if(size == "large"){
    let shawarmaPrize = 40 * quantity;
    let orderDetailes = {fname:fname,phone:phone,subTotal:shawarmaPrize,size:size,timestamp:timestamp};
    db.collection('orders').add(orderDetailes); 
    getMomoToken();
    
      
    agent.add(`you have ordered ${quantity} large shawarma your subTotal is k${shawarmaPrize}`);
    
     
    
    
    }
    

    
    
    //console.log(agent.parameters.phoneNumber);
    //db.collection('orders').add({fname:'joshua'});  
    
    
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('make_payments - yes',makepayment );
  intentMap.set('make_payments - no',test1 );
  
  
  
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

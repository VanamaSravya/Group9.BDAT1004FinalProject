// chrome.windows.getAll({populate:true},function(windows){
//     windows.forEach(function(window){
//       window.tabs.forEach(function(tab){
//         //collect all of the urls here, I will just log them instead
//         console.log(tab.url);
//       });
//     });
//   });

// chrome.tabs.onUpdated.addListener(grab_url);

// function grab_url(tabId, changeInfo, tab){
//     // console.log('Title ' + typeof(changeInfo.title));
//     if((url = changeInfo.url) && changeInfo.title != 'New Tab'){
//         // console.log("Hello!");
//         console.log(url);
//     }
// }

// {/* <script type="text/javascript" src="/eel.js"></script> */}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


const api_url = 'http://localhost:5000/status/';
const api_url_ip = 'http://127.0.0.1:5000/';
const api_domain = 'https://cyber-knights-master.herokuapp.com/';

chrome.webRequest.onBeforeRequest.addListener(
  function(url_data){
    if((url_data.url.indexOf(api_domain) !=-1? true: false) || (url_data.url.indexOf(api_url_ip) !=-1? true: false)) 
      return {cancel: false};

    let req_url = api_url+url_data.url;
    console.log('before');
    console.log(req_url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', req_url, false);

    let data = 'AR';
    xhr.onload = function(){
      console.log(xhr.readyState);
      if(this.status == 200){
        data = JSON.parse(this.responseText);
        
        console.log(data.status);
        
      }

      else{
        console.log('Request Error');
      }
    }

    xhr.send();
    
    if(data.status == 'Safe'){
      console.log('Allowing...');
      return {cancel: false};
    }

    else{
      console.log('Blocking');
      return {cancel: true};
    }

    console.log('returning');
    // return {cancel: true};
  },

  {urls : ['<all_urls>']},

  ["blocking"]

);

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.create({url: chrome.extension.getURL('notes.html')});
// });
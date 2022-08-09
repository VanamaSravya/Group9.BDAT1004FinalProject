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

block = ["*://*.dentaldisinfection.com/*", "*://become007.com/*", "*://steamcommunity.com/*", "*://dota2reward.fun/*", "*://*.dhamaka-offers.com/*", "*://pubskins.com/*", "http://*/Bazaarcart*"]
chrome.webRequest.onBeforeRequest.addListener(
  function(details){

    console.log(details)
    
    return {cancel: true};
  },

  {urls : block},

  ["blocking"]

);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: chrome.extension.getURL('notes.html')});
});
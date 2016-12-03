/**
 * Created by sheshank.kodam on 12/3/16.
 */


var options = {
    type: "basic",
    title: "My first pop-up with chrome",
    message: "This is cool!!",
    iconUrl: "images/slingify_logo1.png",
};

chrome.notifications.create(options);
chrome.notifications.onClicked.addListener(replyBtnClick);

function replyBtnClick(){
    alert("Alert from responding_to_events.js")
}

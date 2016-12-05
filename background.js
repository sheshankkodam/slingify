// Twitter
var tweetMessages = [];
var tweetImages = [];
var dataItemId = [];
var latestId;
var latestTweet;
var latestTweetImage;
var newTweet;

// Twitter notifications
var tweetNotifications= [];
var tweetNotificationsIds = [];
var latestTweetNotificationId;
var latestTweetNotification;
var newTweetNotification;


// facebook
var fbAccessToken = 'EAACEdEose0cBAH0xmn7AZAadwmcKlwPKbkJ7fXAon84KeubvWsyUh8aQIZA9U4aeqk59rqepkhKF1wPHyhxriPF9ePGTlQZCkvMiRvZAEWUJ3krOccpxHiWRYitCvqLFtTMr4w2RVAAtILtaZBVQxht0Yordj7NOGnGDEJW3EBgZDZD';
var fbGraphUrl = 'https://graph.facebook.com/SLINGify/posts/?access_token=' + fbAccessToken;
var latestFbMessage;
var latestFbMessageId;
var newFbPost;

$(function () {
    facebookEngine();
    setInterval(facebookEngine, 2000);
    twitterEngine();
    setInterval(twitterEngine, 2000);
    twitterNotificationEngine();
    setInterval(twitterNotificationEngine, 2000)

});
function twitterEngine() {
    console.log("Twitter engine running")
    showCurrentTime();
    $.get("https://twitter.com/slingify", function (data) {
        var htmlData = data;
        $data = $(htmlData).find('#stream-items-id').eq(0);
        $('body').append($data)

        for(var i=0; i< $data.find('li.stream-item').length; i++){
            dataItemId[i] = $data.find('li.stream-item').eq(i).attr('data-item-id');
            // tweetMessages[i] = ($($data).find('li.stream-item').eq(i).find('div.js-tweet-text-container').find('p.tweet-text').text()).replace(/\n/g,'').trim();
            tweetMessages[i] = ($($data).find('li.stream-item').eq(i).find('div.js-tweet-text-container').find('p.tweet-text')).text().replace('pic.twitter.com/','');
            tweetImages[i] = ($($data).find('li.stream-item').eq(i).find('div.AdaptiveMedia-photoContainer').attr('data-image-url'));
        }

        if(latestId === undefined || latestId !== dataItemId[0]){
            //during first run
            latestId = dataItemId[0];
            latestTweet = tweetMessages[0];
            latestTweetImage = tweetImages[0];
            newTweet = true;
        } else if(latestId === dataItemId[0]){
            // not a new tweet
            newTweet = false;
        }

        if(newTweet === true){
            if(latestTweetImage === undefined) {
                var options = {
                    type: "basic",
                    title: "Slingify-Twitter Notifier",
                    iconUrl: "images/slingify_logo1.png",
                    message: latestTweet
                };
                chrome.notifications.create(options);
            } else {
                var options = {
                    type: "image",
                    title: "Slingify-Twitter Notifier",
                    iconUrl: "images/slingify_logo1.png",
                    message: latestTweet,
                    imageUrl: latestTweetImage
                };
                chrome.notifications.create(options);
            }
        } else {
            //do nothing
        }

    });
}

function facebookEngine() {
    console.log("Running Facebook engine")
    $.getJSON(fbGraphUrl, function (data) {
        if(latestFbMessageId === undefined || latestFbMessageId !== data['data'][0]['id']){
            latestFbMessage = data['data'][0]['message'];
            latestFbMessageId = data['data'][0]['id'];
            newFbPost = true;
        } else if(latestFbMessageId === data['data'][0]['id']){
            // not a new tweet
            newFbPost = false;
        }

        if (newFbPost === true){
            var options = {
                type: "basic",
                title: "Slingify-Faebook Notifier",
                iconUrl: "images/slingify_logo1.png",
                message: latestFbMessage
            };
            chrome.notifications.create(options);
        }
    })
}

function twitterNotificationEngine() {
    console.log("Twitter notification engine running")
    showCurrentTime();
    showCurrentTime()
    $.get("https://twitter.com/i/notifications", function (data) {
        var htmlData = data;
        $data = $(htmlData).find('#stream-items-id').eq(0);
        $('body').append($data);

        for(var i=0; i< $data.find('li.stream-item').length; i++){
            tweetNotificationsIds[i] = $data.find('li.stream-item').eq(i).attr('data-item-id');
            // tweetMessages[i] = ($($data).find('li.stream-item').eq(i).find('div.js-tweet-text-container').find('p.tweet-text').text()).replace(/\n/g,'').trim();
            tweetNotifications[i] = ($($data).find('li.stream-item').eq(i).find('div.js-tweet-text-container').find('p.tweet-text')).text().replace('pic.twitter.com/','');
        }

        if(latestTweetNotificationId === undefined || latestTweetNotificationId !== tweetNotificationsIds[0]){
            latestTweetNotificationId = tweetNotificationsIds[0];
            latestTweetNotification = tweetNotifications[0];
            newTweetNotification = true;
        } else if(latestTweetNotificationId === tweetNotificationsIds[0]){
            // not a new tweet
            newTweetNotification = false;
        }

        if(newTweetNotification === true){
            var options = {
                type: "basic",
                title: "Slingify-Twitter Notifier",
                iconUrl: "images/slingify_logo1.png",
                message: latestTweetNotification
            };
            chrome.notifications.create(options);
        }

    });
}

function showCurrentTime() {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    console.log(datetime)

}




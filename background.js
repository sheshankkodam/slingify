var tweetMessages = [];
var tweetImages = [];
var dataItemId = [];
var latestId;
var latestTweet;
var latestTweetImage;
var newTweet;



$(function () {
    engine();
    setInterval(engine, 2000)
});
function engine() {
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
                    imageUrl: "https://pbs.twimg.com/media/CyXsBrTXcAA9cch.jpg"
                };
                chrome.notifications.create(options);
            }
        } else {
            //do nothing
        }

    });


    //

    // chrome.notifications.onClicked.addListener(replyBtnClick);
}



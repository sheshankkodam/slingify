var tweetMessages = [];
var dataItemId = [];
var latestId;
var latestTweet;
var newTweets = [];

$(function () {
    $.get("https://twitter.com/slingify", function (data) {
        var htmlData = data;
        $data = $(htmlData).find('#stream-items-id').eq(0);
        $('body').append($data)

        for(var i=0; i< $data.find('li.stream-item').length; i++){
            dataItemId[i] = $data.find('li.stream-item').eq(0).attr('data-item-id');
            tweetMessages[i] = ($($data).find('li.stream-item').eq(i).find('div.js-tweet-text-container').text()).replace(/\n/g,'').trim();
        }

        latestId = dataItemId[0];
        latestTweet = tweetMessages[0];

        // if(latestId == dataItemId[0]){
        //     //no update
        // } else if (latestId === undefined){
        //
        // } else if (latestId != dataItemId[0]){
        //
        // }
        console.log(latestId);
        console.log(latestTweet);
    })
});



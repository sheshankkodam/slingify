$(function () {
    $.get("https://twitter.com/slingify", function (data) {
        var htmlData = data;
        $('body').append($(htmlData).find('#stream-items-id').eq(0));
    })
});



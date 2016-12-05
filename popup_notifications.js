/**
 * Created by sheshank.kodam on 12/3/16.
 */


var options = {
    type: "basic",
    title: "My first pop-up with chrome",
    message: "This is cool!!",
    iconUrl: "images/slingify_logo1.png",
};
//
// var options = {
//     type: "image",
//     title: "My first pop-up with chrome",
//     message: "This is cool!!",
//     iconUrl: "images/slingify_logo1.png",
//     imageUrl: "images/slingify_logo1.png"
// };

// var options = {
//     type: "list",
//     title: "Primary Title",
//     message: "Primary message to display",
//     iconUrl: "images/slingify_logo1.png",
//     items: [{ title: "Item1", message: "This is item 1."},
//         { title: "Item2", message: "This is item 2."},
//         { title: "Item3", message: "This is item 3."}]
// }

// var options = {
//     type: "progress",
//     title: "Primary Title",
//     message: "Primary message to display",
//     iconUrl: "images/slingify_logo1.png",
//     progress: 42
// }

chrome.notifications.create(options, callback);

function callback() {
    console.log("popup done")
    
}

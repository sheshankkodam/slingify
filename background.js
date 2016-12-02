chrome.contextMenus.create({
    title: "Slingify Toolkit",
    contexts:["selection"],
    onclick: myFunction


});


function myFunction() {
    alert("you clicked me");
}
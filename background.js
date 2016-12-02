chrome.contextMenus.create({
    title: "Slingify Toolkit",
    contexts:["selection"],
    onclick: myFunction


});


function myFunction(selectedText) {
    chrome.tabs.create({url: "https://twitter.com/intent/tweet?text="+selectedText.selectionText})
}
var contextList = ["selection", "page", "image", "link"]

for(var i=0; i<contextList.length; i++){
    var context = contextList[i];
    var title = "Slingify toolkit: share this "+context+" on your profile"
    chrome.contextMenus.create({
        title: title,
        contexts: [context],
        onclick: clickHandler,
        id: context
    });
}

function clickHandler(data, tab) {
    switch(data.menuItemId) {
        case 'selection':
            chrome.windows.create({url: "https://twitter.com/intent/tweet?text="+
            encodeURIComponent(data.selectionText), type: "panel"});
            break;
        case 'link':
            chrome.windows.create({url: "https://twitter.com/intent/tweet?url="+
            encodeURIComponent(data.linkUrl), type: "panel"});
            break;
        case 'image':
            chrome.windows.create({url: "https://twitter.com/intent/tweet?url="+
            encodeURIComponent(data.srcUrl), type: "panel"});
            break;
        case 'page':
            chrome.windows.create({url: "https://twitter.com/intent/tweet?text="+
            encodeURIComponent(tab.title)+"&url="+(data.pageUrl), type: "panel"});
            break;
    }
}
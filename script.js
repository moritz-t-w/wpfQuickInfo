function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function getContents(subPath) {
    return getElementByXpath("/html/body/div[3]/div[1]/section/div[1]/div[1]/div[1]/div/div/div/div/div/div/div[9]/"+subPath).innerHTML.trim();
}

let groups = {
    1: {
        tuesday: {
            date: getContents("div[1]/div/div[1]/div[1]"),
            location: getContents("div[1]/div/div[1]/div[3]"),
            info: getContents("div[1]/div/div[2]/div")
        },
        thursday: {
            date: getContents("div[2]/div/div[1]/div[1]"),
            location: getContents("div[2]/div/div[1]/div[3]"),
            info: getContents("div[2]/div/div[2]/div")
        },
    }
}
console.log(groups)
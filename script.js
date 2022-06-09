class Day{
    date = "";
    location = "";
    info = "";
    constructor(date, location, info){
        this.date = date;
        this.location = location;
        this.info = info;
    }
}

class Week {
    tuesday = {};
    thursday = {};
    
    constructor(tuesday, thursday){
        this.tuesday = tuesday;
        this.thursday = thursday;
    }
}

class Group {
    weeks = [];

    constructor(weeks){
        this.weeks = weeks;
    }
}

const htmlClassNames = new Day("price-title feature-title","amount-price amount feature-title","subtitle")

function getGroups() {
    let dateGroups = elementsToArrays("date");
    let locationGroups = elementsToArrays("location");
    let infoGroups = elementsToArrays("info");

    let groups = [];
    dateGroups.forEach(dateWeeks => {
        let group = new Group([]);
        for (let i = 0; i < dateWeeks.length; i++) {
            group.weeks.push(new Week(
                new Day(
                    dateWeeks[0][0],
                    locationGroups[i][0][0],
                    infoGroups[i][0][0]
                ),
                new Day(
                    dateWeeks[0][1],
                    locationGroups[i][0][1],
                    infoGroups[i][0][1]
                )
            ));
        }
        groups.push(group)
    });
}

function elementsToArrays(property){
    let values = [];
    for (const element of document.getElementsByClassName(htmlClassNames[property])) {
        values.push(element.innerHTML);
    }
    const weeks = chunkArray(values, 2);
    return chunkArray(weeks, weeks.length/2);
}

function chunkArray(array, chunkSize) {
    let result = [];
    while(array.length > 0) {
        result.push(array.splice(0, chunkSize));
    }
    return result
}
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

const htmlClassNames = new Day("price-title feature-title","amount-price amount feature-title","subtitle");
//days of the week
const dsotw = ["tuesday", "thursday"];

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
                    dateWeeks[i][0],
                    locationGroups[i][0][0],
                    infoGroups[i][0][0]
                ),
                new Day(
                    dateWeeks[i][1],
                    locationGroups[i][0][1],
                    infoGroups[i][0][1]
                )
            ));
        }
        groups.push(group);
    });
    return groups;
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
    return result;
}

let groups = getGroups();

function groupsIndexTHead () {
    let tHead = "";
    for (let i = 0; i < groups.length; i++) {
        tHead += `<th colspan="2"> Gruppe ${i+1}</th>`;
    }
    return tHead;
}
function groupsPropTHead() {
    let tHead = "";
    groups.forEach(() => {tHead += "<th>Ort</th><th>Treffpunkt/Info</th>"});
    return tHead;
}
function groupsTBody() {
    let tBody = "";
    console.log(groups);
    groups[0].weeks.forEach(week => {
        dsotw.forEach(day => {
            tBody += `
                <tr>
                    <th>${week[day].date}</th>`
                    let wd;
                    groups.forEach((group) => {
                        wd = group.weeks[groups[0].weeks.indexOf(week)][day];
                        tBody += `
                            <td>${wd.location}</td>
                            <td>${wd.info}</td>
                        `;
                    });
            tBody += `
                </tr>
            `;
        });
    })
    return tBody;
}

let title = document.title;
document.write(`
    <html>
        <head>
            <title>${title}</title>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th rowspan='2'>Datum</th>
                        ${groupsIndexTHead()}
                    </tr>
                    <tr>
                        ${groupsPropTHead()}
                    </tr>
                </thead>
                <tbody>
                    ${groupsTBody()}
                </tbody>
            </table>
        </body>
    </html>
`)
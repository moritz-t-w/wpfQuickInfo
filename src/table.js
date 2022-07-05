function table() {
	const htmlClassNames = new Day("price-title feature-title", "amount-price amount feature-title", "subtitle");
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

	function elementsToArrays(property) {
		let values = [];
		for (const element of document.getElementsByClassName(htmlClassNames[property])) {
			values.push(element.innerHTML);
		}
		const weeks = chunkArray(values, 2);
		return chunkArray(weeks, weeks.length / 2);
	}

	function chunkArray(array, chunkSize) {
		let result = [];
		while (array.length > 0) {
			result.push(array.splice(0, chunkSize));
		}
		return result;
	}

	let groups = getGroups();

	function groupsIndexTHead() {
		let tHead = "";
		for (let i = 0; i < groups.length; i++) {
			tHead += `<th colspan="2"> Gruppe ${i + 1}</th>`;
		}
		return tHead;
	}

	function groupsPropTHead() {
		let tHead = "";
		groups.forEach(() => { tHead += "<th>Ort</th><th>Treffpunkt/Info</th>" });
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
		<!DOCTYPE html>
		<html lang=de>
			<head>
				<title>${title}</title>
				<style>
					/* global style */
					table {
						/* combine borders and remove spacing*/
						border-collapse: collapse;
						border-spacing: 0;
						/* text style */
						font: normal 12px/14px "Helvetica Neue", Helvetica, Arial, sans-serif;
						overflow: hidden;
						word-break: normal;
					}


					/* center the table header */
					thead th {
						text-align: center;
					}

					/* italic headers */
					th {
						font-style: italic;
						font-weight: normal;
					}


					/* all cells border and padding */
					td,
					th {
						border: 1px solid black;
						padding: 10px 5px;
					}

					/* vertical header left & right outer border */
					tbody tr th {
						border-right: 2px solid black;
						border-left: 2px solid black;
					}

					/* vertical header bottom outer border */
					tbody tr:last-child th {
						border-bottom: 2px solid black;
					}

					/* vertical header normal top outer border */
					tbody tr:first-child th {
						border-top: 1px solid black;
					}


					/* horizontal header left & right outer border */
					thead {
						border-right: 2px solid black;
						border-left: 2px solid black;
					}

					/* horizontal header top outer border */
					thead tr:first-child {
						border-top: 2px solid black;
					}

					/* horizontal header bottom outer border */
					thead tr:last-child th {
						border-bottom: 2px solid black;
					}

					/* top left cell (Datum) normal bottom border */
					thead tr:first-child th:first-child {
						border-bottom: 1px;
					}

					/* thick border between groups */
					thead tr th:nth-child(even),
					tbody tr td:nth-child(odd) {
						border-right: 1.5px solid black;
					}

					/* thick border between weeks */
					tbody tr:nth-child(even) {
						border-bottom: 1.5px solid black;
					}


					/* table outer border */
					table {
						border: 2px solid black;
					}
				</style>
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
}
document.body.onload(table());
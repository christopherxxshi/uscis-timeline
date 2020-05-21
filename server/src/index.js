const superagent = require("superagent");
const cheerio = require("cheerio");
var fs = require("fs");

const BASE_URL =
    "https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=";

function requestCaseStatus(caseNumber) {
    return superagent.get(BASE_URL + `${caseNumber}`).then((res) => {
        if (res.statusType === 2) {
            return { caseNumber, ...HTMLParser(res.text) };
        }
    });
}

function HTMLParser(html) {
    const $ = cheerio.load(html);
    let paragraph = $("div.rows.text-center p").text();
    let type = "unknown";
    let date = "";

    if (paragraph !== "") {
        let typeRegex = /Form [a-zA-Z]{1}-[0-9]{1,}/;
        let dateRegex = /[a-zA-Z]{3,9} [0-9]{1,2}, [0-9]{4}/;

        type = paragraph.match(typeRegex)[0];
        date = paragraph.match(dateRegex)[0];
    }

    return {
        status: $("div.rows.text-center h1").text(),
        date: date ? date : "",
        type: type ? type : "",
    };
}

async function spider() {
    let startNumber = 2019450900;
    let center = "EAC";
    let range = 100;
    let result = [];
    let redArr = [];
    for (let i = 0; i < range; i++) {
        redArr.push(
            requestCaseStatus(center + (startNumber + i)).then((res) => {
                result.push(res);
            })
        );
    }
    await Promise.all(redArr);
    console.log(result);
    return result;
}

function main() {
    spider();
}

main();

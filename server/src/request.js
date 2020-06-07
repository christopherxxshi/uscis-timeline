const superagent = require("superagent");
const cheerio = require("cheerio");

const utils = require("./utils");

const BASE_URL =
    "https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=";

function requestCaseStatus(receiptNumber) {
    return superagent.get(BASE_URL + `${receiptNumber}`).then((res) => {
        if (res.statusType === 2) {
            return {
                receiptNumber,
                centerCode: receiptNumber.substring(0, 3),
                numberPart: parseInt(receiptNumber.substring(3)),
                year: parseInt(receiptNumber.substring(3, 5)),
                workingDay: parseInt(receiptNumber.substring(5, 8)),
                caseNumber: parseInt(receiptNumber.substring(8)),
                ...HTMLParser(res.text),
            };
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
        date: date ? utils.dateConverter(date) : "",
        type: type ? type : "",
    };
}

module.exports = {
    requestCaseStatus,
    HTMLParser,
};

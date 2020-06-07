const mongoose = require("mongoose");

const CaseOperation = require("./CaseOperation");
const caseRequest = require("./request");

async function spider() {
    let startNumber = 2019450900;
    let center = "EAC";
    let range = 100;
    let result = [];
    let redArr = [];
    for (let i = 0; i < range; i++) {
        redArr.push(
            caseRequest
                .requestCaseStatus(center + (startNumber + i))
                .then((res) => {
                    CaseOperation.saveOrUpdateCase(res);
                })
        );
    }
    await Promise.all(redArr);
    console.log(result);
    return result;
}

mongoose.connect("mongodb://localhost/uscis");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected");
});

function main() {
    // spider();
    CaseOperation.saveOrUpdateCase({
        receiptNumber: "EAC2019450900",
        centerCode: "EAC",
        numberPart: 2019450900,
        year: 20,
        workingDay: 194,
        caseNumber: 50900,
        status: "Case Was Approved",
        date: "2020-04-29T07:00:00.000Z",
        type: "Form I-129",
    });
}

main();

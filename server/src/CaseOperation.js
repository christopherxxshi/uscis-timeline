const DBOperation = require("./DBOperation");

const saveOrUpdateCase = function (caseObj) {
    if (caseObj && caseObj.receiptNumber) {
        DBOperation.findCase(caseObj.receiptNumber).then(function (res) {
            if (res) {
                if (
                    res.status !== caseObj.status ||
                    res.date !== caseObj.date
                ) {
                    DBOperation.updateCase(caseObj.receiptNumber, {
                        status: caseObj.status,
                        date: caseObj.date,
                    });
                }
            } else {
                DBOperation.saveCase({
                    _id: caseObj.receiptNumber,
                    history: [
                        {
                            date: caseObj.date,
                            status: caseObj.status,
                        },
                    ],
                    ...caseObj,
                });
            }
        });
    }
};

module.exports = { saveOrUpdateCase };

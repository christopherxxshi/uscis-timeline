const moment = require("moment");
const momentBusinessDay = require("moment-business-days");

const dateConverter = function (dateStr) {
    const ISODate = moment(dateStr, "MMMM DD, YYYY").toDate().toISOString();
    return ISODate;
};

const receiveDate = function (year, workingDayNumber) {
    momentBusinessDay.updateLocale("us", {
        workingWeekdays: [1, 2, 3, 4, 5, 6, 7],
        holidays: [],
    });
    const firstDayOfYear = momentBusinessDay(
        `01-10-20${year - 1}`,
        "DD-MM-YYYY"
    );
    return firstDayOfYear.businessAdd(workingDayNumber).toDate().toISOString();
};

module.exports = {
    dateConverter,
};

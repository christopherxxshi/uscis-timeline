const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({
    date: { type: String },
    status: { type: String }
});

const CaseSchema = mongoose.Schema({
    _id: { type: String },
    receiptNumber: { type: String },
    centerCode: { type: String },
    numberPart: { type: Number },
    year: { type: Number },
    workingDay: { type: Number },
    caseNumber: { type: Number },
    status: { type: String },
    type: { type: String },
    date: { type: String },
    history: { type: [HistorySchema] },
});

module.exports = mongoose.model("Case", CaseSchema);

const Case = require("./Case");

const saveCase = async function (caseObj) {
    const newCase = new Case({
        history: [],
        ...caseObj,
    });
    return await newCase.save(function (res) {
        return res;
    });
};

const findCase = async function (receiptNumber) {
    const info = await Case.findOne({ _id: receiptNumber }).then((res) => {
        return res;
    });
    return info;
};

const updateCase = async function (receiptNumber, updateInfo) {
    try {
        await Case.updateOne({ _id: receiptNumber }, { $set: updateInfo });
        return Case.updateOne(
            { _id: receiptNumber },
            {
                $push: {
                    history: updateInfo,
                },
            }
        );
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    saveCase,
    findCase,
    updateCase,
};

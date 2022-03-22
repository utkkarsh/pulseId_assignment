// import user model
const Joi = require("joi");
const createHttpError = require("http-errors");
const Transaction = require("../Models/Transaction.model");
const Ruleset = require("../Models/Ruleset.model");
Joi.objectId = require("joi-objectid")(Joi);

// get cashbacks for every transaction
exports.get = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();
    if (!transaction) throw createHttpError.NotFound("No transactions yet!");

    const ruleset = await Ruleset.find();
    if (!ruleset) throw createHttpError.NotFound("No Rules Found!");

    // console.log(ruleset);
    let cashbackResult = [];
    // for Each transaction calculate the cashback values-
    let redemptionData = new Map();

    transaction.forEach((item) => {
      const data = ruleset.filter((rule) => {
        let result = false;

        // Rule 1 : Transaction should be between startDate and endDate (or currentDate)
        //          if endDate is missing consider currentDate as endDate
        result =
          item.date > rule?.startDate &&
          item.date < (rule?.endDate ?? new Date());

        if (result === false) return result;

        // Rule 2 : Cashback can not be applied more times than specified in redemptionLimit
        if (rule?.redemptionLimit != undefined) {
          let redemptionCount = redemptionData.has(rule._id)
            ? redemptionData.get(rule._id) + 1
            : 1;

          // console.log(`Checking limit for ${item.id} ${redemptionCount}`);
          // console.log(`Lim ${rule._id} `, rule.redemptionLimit);
          result = result && redemptionCount <= rule.redemptionLimit;
          console.log(result);
        }

        // return the final result
        return result;
      });

      if (data.length > 0) {
        // console.log(data);
        var cashbackObject = {
          transactionId: item.id,
          amount: parseFloat(data[0].amount),
        };
        redemptionData.set(
          data[0]._id,
          redemptionData.has(data[0]._id)
            ? redemptionData.get(data[0]._id) + 1
            : 1
        );
        console.log(redemptionData);
        cashbackResult.push(cashbackObject);
      }
    });

    res.send(cashbackResult);
  } catch (error) {
    next(error);
  }
};

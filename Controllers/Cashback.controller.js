// import user model
const Joi = require("joi");
const createHttpError = require("http-errors");
const Transaction = require("../Models/Transaction.model");
const Ruleset = require("../Models/Ruleset.model");
Joi.objectId = require("joi-objectid")(Joi);

// This function is used to filter the ruleset based on the given rules.
// This function is not exported and hence can't be used outside of this controller
function filterTransaction(rule, item, redemptionData) {
  let result = false;

  // Rule 1 : Transaction should be between startDate and endDate (or currentDate)
  //          if endDate is missing consider currentDate as endDate
  result =
    item.date > rule?.startDate && item.date < (rule?.endDate ?? new Date());

  if (result === false) return result;

  // Rule 2 : Cashback can not be applied more times than specified in redemptionLimit
  if (rule?.redemptionLimit != undefined) {
    let redemptionCount = redemptionData.has(rule._id)
      ? redemptionData.get(rule._id) + 1
      : 1;

    // console.log(`Checking limit for ${item.id} ${redemptionCount}`);
    // console.log(`Lim ${rule._id} `, rule.redemptionLimit);
    result = result && redemptionCount <= rule.redemptionLimit;
  }

  // return the final result
  return result;
}

// get cashbacks for every transaction
exports.get = async (req, res, next) => {
  try {
    // Get the transaction data from database
    const transaction = await Transaction.find();
    if (!transaction) throw createHttpError.NotFound("No transactions yet!");

    // Get all the rules from database
    const ruleset = await Ruleset.find();
    if (!ruleset) throw createHttpError.NotFound("No Rules Found!");

    let cashbackResult = [];
    let redemptionData = new Map();

    // Iterate each transaction and calculate the cashback
    transaction.forEach((item) => {
      // Filter the valid transactions which are eligible for cashback
      const data = ruleset.filter((rule) =>
        filterTransaction(rule, item, redemptionData)
      );

      if (data.length > 0) {
        // create a cashback object based on the retrieved data
        var cashbackObject = {
          transactionId: item.id,
          amount: parseFloat(data[0].amount),
        };

        // maintain the redemptionLimit data locally in a map
        redemptionData.set(
          data[0]._id,
          redemptionData.has(data[0]._id)
            ? redemptionData.get(data[0]._id) + 1
            : 1
        );

        // console.log(redemptionData);
        cashbackResult.push(cashbackObject);
      }
    });

    res.send(cashbackResult);
  } catch (error) {
    next(error);
  }
};

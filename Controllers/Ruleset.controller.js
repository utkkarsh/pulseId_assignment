// import user model
const Joi = require("joi");
const createHttpError = require("http-errors");
const Ruleset = require("../Models/Ruleset.model");
Joi.objectId = require("joi-objectid")(Joi);

// get rulesets
exports.get = async (req, res, next) => {
  try {
    const rules = await Ruleset.find();
    console.log(rules[1].cashback);
    if (!rules) throw createHttpError.NotFound("No Rules Found!");
    res.send(rules);
  } catch (error) {
    next(error);
  }
};

// Create a new ruleset
exports.create = async (req, res, next) => {
  const { startDate, endDate, amount, redemptionLimit } = req.body;
  console.log(req.body);
  // Schema Validation of Parameters provided in problem statement
  const schema = Joi.object({
    startDate: Joi.date().raw(),
    endDate: Joi.date().raw(),
    amount: Joi.number().required(),
    redemptionLimit: Joi.number(),
  });

  try {
    // Verify the Payload before processing it
    const result = await schema.validateAsync({
      startDate,
      endDate,
      amount,
      redemptionLimit,
    });
    // Check if rule already in database
    // const postExists = await Rule.findOne({
    //   title: result.title,
    // });
    // if (postExists) throw createHttpError.Conflict("Rule already exists.");

    // Create a new rule
    const rule = new Ruleset({
      startDate: result.startDate,
      endDate: result.endDate,
      amount: result.amount,
      redemptionLimit: result.redemptionLimit,
    });
    console.log(rule);

    // Save rule in the database
    const savedRule = await rule.save();
    res.send(savedRule).status(201);
  } catch (error) {
    next(error);
  }
};

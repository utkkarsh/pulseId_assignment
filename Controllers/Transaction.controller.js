// import user model
const Joi = require("joi");
const createHttpError = require("http-errors");
const Transaction = require("../Models/Transaction.model");
Joi.objectId = require("joi-objectid")(Joi);

// get transactions
exports.get = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    // console.log(transactions);
    res.send(transactions);
  } catch (error) {
    next(error);
  }
};

// Create a new Transaction
exports.create = async (req, res, next) => {
  const { date, customerId, id } = req.body;

  // Schema Validation of Parameters provided in problem statement
  const schema = Joi.object({
    date: Joi.date().raw().required(),
    customerId: Joi.number(),
    id: Joi.number().required(),
  });

  try {
    // Verify the Payload before processing it
    const result = await schema.validateAsync({
      date,
      customerId,
      id,
    });

    // Check if transaction already in database
    const dataExists = await Transaction.findOne({
      id: result.id,
    });
    if (dataExists)
      throw createHttpError.Conflict("Transaction already exists.");

    // Create a new transaction
    const transaction = new Transaction({
      date: result.date,
      customerId: result.customerId,
      id: result.id,
    });

    // Save transaction in the database
    const savedTransaction = await transaction.save();
    res.send(savedTransaction).status(201);
  } catch (error) {
    next(error);
  }
};

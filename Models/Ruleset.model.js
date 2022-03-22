const Mongoose = require("mongoose");

// Defining PostSchema for post creation and maintenance.
const rulesetSchema = new Mongoose.Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    cashback: {
      type: Mongoose.Schema.Types.Decimal128,
    },
    redemptionLimit: {
      type: Number,
    },
    minTransactions: {
      type: Number,
    },
    budget: {
      type: Mongoose.Schema.Types.Decimal128,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Ruleset", rulesetSchema);

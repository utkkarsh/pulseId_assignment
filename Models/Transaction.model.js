const Mongoose = require("mongoose");

// Defining transactionSchema for creation and maintenance of transactions.
const transactionSchema = new Mongoose.Schema(
  {
    date: {
      type: Date,
    },
    id: {
      type: Number,
      index: { unique: true },
    },
    customerId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Transaction", transactionSchema);

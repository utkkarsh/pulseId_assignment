// import user model
const Joi = require("joi");
const createHttpError = require("http-errors");
const Transaction = require("../Models/Transaction.model");
const Post = require("../Models/Ruleset.model");
Joi.objectId = require("joi-objectid")(Joi);

// get cashbacks for every transaction
exports.get = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();
    if (!transaction) throw createHttpError.NotFound("No transactions yet!");
    res.send(transaction);
  } catch (error) {
    next(error);
  }
};

// // Create a new Transaction
// exports.create = async (req, res, next) => {
//   const { title, content } = req.body;

//   // Schema Validation of Parameters provided in problem statement
//   const schema = Joi.object({
//     title: Joi.string().trim().required(),
//     content: Joi.string().trim().required(),
//   });

//   try {
//     // Verify the Payload before processing it
//     const result = await schema.validateAsync({
//       title,
//       content,
//     });

//     // Check if post already in database
//     const postExists = await Post.findOne({
//       title: result.title,
//     });
//     if (postExists) throw createHttpError.Conflict("Post already exists.");

//     // Create a new post
//     const post = new Post({
//       title: result.title,
//       body: result.content,
//     });

//     // Save post in the database
//     const savedPost = await post.save();
//     res.send(savedPost);
//   } catch (error) {
//     next(error);
//   }
// };

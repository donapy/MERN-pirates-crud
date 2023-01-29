const asyncHandler = require("express-async-handler");
const ObjectIdVal = require("mongoose").Types.ObjectId;
const Pirate = require("../models/pirateModel");

// @desc    Get Pirate
// @route   GET /api/pirate/getPirate/
// @access  Public
const getPirate = asyncHandler(async (req, res) => {
  try {
    const pirates = await Pirate.find().sort({ name: 1 });
    return res.status(200).send(pirates);
  } catch (error) {
    return res.status(500).send({ message: "Error, try again" });
  }
});

// @desc    Get Pirate by Id
// @route   GET /api/pirate/getPirate/:id
// @access  Public
const getPirateById = asyncHandler(async (req, res) => {
  try {
    const pirates = await Pirate.find({ _id: req.params._id }, {});
    return res.status(200).send(pirates);
  } catch (error) {
    return res.status(500).send({ message: "Error, try again" });
  }
});

// @desc    Create Pirate
// @route   POST /api/pirate/newPirate
// @access  Public
const newPirate = asyncHandler(async (req, res) => {
  const { name, imgurl, chests, phrase, position, pegleg, eyepatch, hookhand } =
    req.body;
  if (
    !name ||
    name.length < 3 ||
    !imgurl ||
    imgurl.length < 4 ||
    !phrase ||
    phrase.length < 4 ||
    !position ||
    position.lenght < 4
  ) {
    return res.status(400).send({
      message: "Error, invalid inputs to create a new pirate",
    });
  }
  let captain = false;
  if (position === "Captain") {
    captain = await Pirate.findOne({ position: "Captain" });
  }
  if (captain) {
    return res.status(404).json({ message: "Captain already exist" });
  }

  const pirate = await Pirate.create({
    name,
    imgurl,
    chests,
    phrase,
    position,
    pegleg,
    eyepatch,
    hookhand,
  });

  if (pirate) {
    return res.status(201).json({
      success: true,
      _id: pirate._id,
      name: pirate.name,
    });
  } else {
    return res
      .status(400)
      .send({ message: "Error creating the pirate, try again" });
  }
});

// @desc    Update Pirate
// @route   PUT /api/pirate/updatePirate/:id
// @access  Public
const updatePirate = asyncHandler(async (req, res) => {
  try {
    let id = req.params._id;
    if (!ObjectIdVal.isValid(id) && id !== undefined) {
      return res.status(404).send({ message: "Pirate not found" });
    }
    const pirate = await Pirate.findById(id);

    if (!pirate || pirate.length === 0) {
      return res
        .status(400)
        .send({ message: "Error, cant find a pirate with that id" });
    }

    const updatedPirate = await Pirate.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json(updatedPirate);
  } catch (error) {
    return res.status(500).send({ message: "Error, try again" });
  }
});

// @desc    Delete Pirate
// @route   DELETE /api/pirate/deletePirate/:id
// @access  Public
const deletePirate = asyncHandler(async (req, res) => {
  try {
    let id = req.params._id;
    if (!ObjectIdVal.isValid(id) && id !== undefined) {
      return res.status(404).send({ message: "Pirate not found" });
    }
    const pirate = await Pirate.findById(id);

    if (!pirate || pirate.length === 0) {
      return res
        .status(400)
        .send({ message: "Error, cant find a Pirate with that id" });
    }

    await pirate.remove();

    return res.status(200).json({
      success: true,
      id,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error, try again" });
  }
});

module.exports = {
  getPirate,
  newPirate,
  updatePirate,
  deletePirate,
  getPirateById,
};

const ZoneCH = require("../models/restaurant.model");

//Create and Save a new ZoneCH!
exports.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;

  //Validate Data
  if (!name || !type || !imageUrl) {
    return res.status(400).send({
      message: "Name, Type or ImageUrl can not be empty!",
    });
  }

  await ZoneCH.findOne({ where: { name: name } }).then((ZoneCHH) => {
    if (ZoneCHH) {
      res.status(400).send({
        message: "ZoneCH Already Exists!",
      });
      return;
    }

    //Create a ZoneCH
    const newZoneCH = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };
    ZoneCH.create(newZoneCH)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the ZoneCH.",
        });
      });
  });
};

//Get all ZoneCH
exports.getAll = async (req, res) => {
  await ZoneCH.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occured while creating the ZoneCH.",
      });
    });
};

//Get By ID ZoneCH
exports.getById = async (req, res) => {
  const id = req.params.id;
  await ZoneCH.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No Found ZoneCH with id " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occured while creating the ZoneCH.",
      });
    });
};

// Update a ZoneCH
exports.update = async (req, res) => {
  const id = req.params.id;
  await ZoneCH.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ZoneCH was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update ZoneCH with id=" +
            id +
            "Maybe ZoneCH was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the ZoneCH.",
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await ZoneCH.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ZoneCH was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete ZoneCH with id=" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the ZoneCH.",
      });
    });
};
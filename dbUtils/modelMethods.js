exports.findById = (Model) => async (id) => {
  return await Model.findById(id);
};

exports.findByEmail = (Model) => async (email) => {
  return await Model.findOne({ email });
};

exports.createOne = (Model) => async (payload) => {
  return await Model.create(payload);
};

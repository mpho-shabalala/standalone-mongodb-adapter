const bcrypt = require('bcrypt');

/**
 * Injects common pre-save hooks into a schema.
 * Can be reused on any schema with a `password` field.
 */
module.exports = function injectHooks(schema) {
  // Hash password before saving
  schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

  // Optionally, add a createdAt/updatedAt tracker manually (if not using timestamps option)
  schema.pre('save', function (next) {
    if (!this.createdAt) this.createdAt = new Date();
    next();
  });

  // You can add other hooks here later (e.g. remove, updateOne, etc.)
};

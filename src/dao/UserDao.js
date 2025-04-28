import User from "../models/User.js";

export default class UserDao {
  async create(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async getById(id) {
    return await User.findById(id);
  }
}

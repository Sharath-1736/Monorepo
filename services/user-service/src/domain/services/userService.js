// Example domain service (business logic)
module.exports = {
  async registerUser(userData, userRepository) {
    // Add business rules here (e.g., check for existing user, send welcome email, etc.)
    const existing = await userRepository.findByEmail(userData.email);
    if (existing) throw new Error('User already exists');
    return userRepository.create(userData);
  },
};

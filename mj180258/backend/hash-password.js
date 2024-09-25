const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};

hashPassword('Pass123$');

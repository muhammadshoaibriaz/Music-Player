const User = require('../schemas/user');

const Welcome = async (req, res) => {
  res.json({message: 'Welcome Shabii'});
};

const SignUp = async (req, res) => {
  try {
    const {email, password, name} = req.body;
    const user = await User.findOne({email});
    if (user) {
      console.log('User Already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name: name,
    });
    await newUser.save();
    res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error creating user'});
  }
};

module.exports = {Welcome, SignUp};

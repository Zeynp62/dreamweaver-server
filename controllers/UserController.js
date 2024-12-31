//connect to the models
const User = require('./../models/user')
const Task = require('./../models/tasks')
const Post = require('./../models/post')

//create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send({ msg: 'Error creating new user!', error })
  }
}

// get user by id for populate('post'), and for populate('Tasks')
const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('tasks')
      .populate('posts')
    res.status(200).send(user)
  } catch (error) {
    return res.status(400).send({ msg: 'Error finding a user by ID!', error })
  }
}

// get user by query
const getUserByQuery = async (req, res) => {
  try {
    let users = []

    for (const param of Object.keys(req.query)) {
      const results = await User.find({ [param]: req.query[param] })
      results.forEach((result) => {
        if (
          !users.some((user) => {
            return user._id.toString() === result._id.toString()
          })
        ) {
          users.push(result)
        }
      })
    }
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ msq: 'Error finding a user by query' }, error)
  }
}

// get all the users
const getAllUsers = async (req, res) => {
  try {
    //getting the users as objects
    const users = await User.find({});
res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ msg: 'Error getting all users!', error })
  }
}

// update
const updateUserByID = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send({ msg: 'Error Updating user', error })
  }
}

// delete
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ msg: 'User not found!' });
    }

    // Delete related tasks and posts
    await Task.deleteMany({ user: user._id });
    await Post.deleteMany({ user: user._id });

    res.status(200).send({ msg: 'User successfully deleted!', user });
  } catch (error) {
    res.status(400).send({ msg: 'Error Deleting user', error });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    let profileImg = req.file ? req.file.path : undefined;

    // Normalize the path to use forward slashes (important for Windows)
    if (profileImg) {
      profileImg = profileImg.replace(/\\/g, '/');
    }

    // Prepare the update data
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (profileImg) updateData.profileImg = profileImg;

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.user_id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ msg: 'User not found' });
    }

    res.status(200).send({ user: updatedUser });
  } catch (error) {
    res.status(500).send({ msg: 'Error updating user profile', error: error.message });
  }
};


// module exports
module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  getUserByQuery,
  updateUserByID,
  deleteUserById,
  updateUserProfile
}

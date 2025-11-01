import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const PORT = process.env.PORT || 3000
const app = express()

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
)
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, `Please enter userName`]
    },
    email: {
      type: String,
      required: [true, `Please enter email`],
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, `Please enter password`]
    },
    tasks: {
      type: [TaskSchema],
      default: []
    }
  },
  { timestamps: true }
)
const Users = mongoose.model('Users', UserSchema)

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(400).json({ message: `Invalid authorization` })
  }
  const token = header.split(' ')[1]
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: `Invalid Token` })
    req.user = decoded
    next()
  })
}

app.use(express.json())

// --- ROUTE: /register (POST) ---
app.post('/register', async (req, res) => {
  const { userName, email, password } = req.body
  if (!userName || !email || !password) {
    return res.status(400).json(
      { message: `userName and email and password are required!` }
    )
  }
  if (password.length < 6) {
    return res.status(400).json({ message: `You password too short` })
  }
  try {
    const user = await Users.findOne({ email: email })
    if (user) {
      return res.status(409).json({ message: `User Already Exists!` })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = {
      userName: userName,
      email: email,
      passwordHash: hashedPassword
    }
    await Users.create(newUser)
    res.status(201).json(
      { message: `User registered successfully`, userName: userName, email: email }
    )
  }
  catch (err) {
    console.log(`Error from ((Register)): ${err.message}`)
    // Handle MongoDB validation error (if unique constraint fails)
    if (err.code === 11000) {
      return res.status(409).json({ message: `User Already Exists (Duplicate Key)!` })
    }
    res.status(500).json({ message: `500 Internal Server Error` })
  }
})

// --- ROUTE: /login (POST) ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: `Email and Password are required!` })
  }
  try {
    const user = await Users.findOne({ email: email })
    if (!user) {
      return res.status(401).json({ message: `Wrong email or password` })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: `Wrong email or password` })
    }

    const payload = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' })

    res.json({
      message: `User login successful`,
      token: token
    })
  }
  catch (err) {
    console.log(`Error from ((Login)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
})

// --- ROUTE: /profile (GET) ---
app.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: `User show profile successful`,
    user: req.user
  })
})

// --- ROUTE: /profile/tasks (GET) - Read all tasks ---
app.get('/profile/tasks', verifyToken, async (req, res) => {
  const userId = req.user.id
  try {
    const user = await Users.findById(userId)
    if (!user) {
      return res.status(404).json({ message: `User not found` })
    }
    res.json(user.tasks)
  }
  catch (err) {
    console.log(`Error from ((GET /profile/tasks)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
})

// --- ROUTE: /profile/tasks (POST) - Create a new task ---
app.post('/profile/tasks', verifyToken, async (req, res) => {
  const userId = req.user.id
  const { task } = req.body
  if (!task || task.trim() === '') {
    return res.status(400).json({ message: 'Task content is required.' });
  }
  try {
    const newTask = { task: task, completed: false }
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { $push: { tasks: newTask } },
      { new: true, runValidators: true }
    )
    const latestTask = updatedUser.tasks[updatedUser.tasks.length - 1];
    res.status(201).json(latestTask)
  }
  catch (err) {
    console.log(`Error from ((POST /profile/tasks)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
})

// --- ROUTE: /profile/tasks/:taskId (PUT) - Update a task (RESTful) ---
app.put('/profile/tasks/:taskId', verifyToken, async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.taskId
  const { task, completed } = req.body

  if (task === undefined && completed === undefined) {
    return res.status(400).json({ message: 'At least one field (task or completed) is required for update.' });
  }
  try {
    let updateFields = {};

    // Use MongoDB's dot notation to specify the field within the embedded array element
    if (task !== undefined) {
      updateFields['tasks.$.task'] = task;
    }
    if (completed !== undefined) {
      updateFields['tasks.$.completed'] = completed;
    }

    // Find the user by ID and the task element by its _id within the tasks array
    const updatedUser = await Users.findOneAndUpdate(
      // Filter: Match the user AND the task _id within the tasks array
      { _id: userId, 'tasks._id': taskId },
      // Update: Use $set on the positional operator ($) to update the matched element
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: `Task not found or does not belong to user` });
    }

    // Find the updated task from the returned document to send back to the client
    const updatedTask = updatedUser.tasks.find(t => t._id.toString() === taskId);
    res.json(updatedTask);
  }
  catch (err) {
    console.log(`Error from ((PUT /profile/tasks/:taskId)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
});

// --- ROUTE: /profile/tasks/:taskId (DELETE) - Delete a task (RESTful) ---
app.delete('/profile/tasks/:taskId', verifyToken, async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.taskId

  try {
    // Find the user and pull the task element by its _id from the tasks array
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      // Use $pull to remove elements from the array that match the criteria
      { $pull: { tasks: { _id: taskId } } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: `User not found` });
    }

    res.status(204).send(); // 204 No Content for successful deletion
  }
  catch (err) {
    console.log(`Error from ((DELETE /profile/tasks/:taskId)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
});

// /* Removeme: This code just for test (UNCHANGED)
app.get('/all', async (_req, res) => {
  try {
    const users = await Users.find({})
    res.json(users)
  }
  catch (err) {
    console.log(`Error from ((all)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
})
app.get('/delete', async (_req, res) => {
  try {
    await Users.deleteMany({})
    console.log('--> Ok <-- Delete All Users Done...')
    res.json({ message: `--> Ok <-- Delete All Users Done...` })
  }
  catch (err) {
    console.log(`Error from ((delete)): ${err.message}`)
    res.status(500).json({ message: `500 Internal Server Error` })
  }
})
// */ // removeme

app.get('/', (_req, res) => {
  res.json({
    message: "Welcome to the Auth & Task API!",
    documentation: {
      authentication: {
        register: {
          method: "POST",
          path: "/register",
          description: "Register a new user.",
          body: ["userName", "email", "password"],
          response: {
            message: "User registered successfully",
            userName: "user",
            email: "user@example.com"
          }
        },
        login: {
          method: "POST",
          path: "/login",
          description: "Login an existing user.",
          body: ["email", "password"],
          response: {
            message: "User login successful",
            token: "<jwt_token>"
          }
        }
      },
      profile: {
        getProfile: {
          method: "GET",
          path: "/profile",
          description: "Get the profile of the currently logged-in user. Requires a valid JWT in the Authorization header.",
          headers: {
            Authorization: "Bearer <jwt_token>"
          },
          response: {
            message: "User show profile successful",
            user: {
              id: "<user_id>",
              userName: "user",
              email: "user@example.com"
            }
          }
        }
      },
      tasks: {
        getAllTasks: {
          method: "GET",
          path: "/profile/tasks",
          description: "Get all tasks for the logged-in user. Requires a valid JWT.",
          headers: {
            Authorization: "Bearer <jwt_token>"
          },
          response: "An array of task objects."
        },
        createTask: {
          method: "POST",
          path: "/profile/tasks",
          description: "Create a new task for the logged-in user. Requires a valid JWT.",
          headers: {
            Authorization: "Bearer <jwt_token>"
          },
          body: ["task"],
          response: "The newly created task object."
        },
        updateTask: {
          method: "PUT",
          path: "/profile/tasks/:taskId",
          description: "Update a specific task for the logged-in user. Requires a valid JWT.",
          headers: {
            Authorization: "Bearer <jwt_token>"
          },
          body: ["task (optional)", "completed (optional)"],
          response: "The updated task object."
        },
        deleteTask: {
          method: "DELETE",
          path: "/profile/tasks/:taskId",
          description: "Delete a specific task for the logged-in user. Requires a valid JWT.",
          headers: {
            Authorization: "Bearer <jwt_token>"
          },
          response: "204 No Content"
        }
      }
    }
  });
});

app.all('*', (_req, res) => {
  res.status(404).json({ message: `Page not found` })
})


// Connect to Database and Start Server
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.clear()
    console.log(`✅ OK --> Connected to MongoDB Database!`)
    app.listen(PORT, () => console.log(`✅ OK --> Server listening on http://localhost:${PORT}...`))
  })
  .catch((error) => {
    console.log('❌ Error --> MongoDB Connection Failed!')
    console.error(error.message); // Print detailed error
  })

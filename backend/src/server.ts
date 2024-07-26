import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sample_tasks, sample_user } from './data';
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

dotenv.config();

const PORT = 5000;
const app = express();
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI!)
    .then(() => {
        console.log("Connected to MongoDB");
        initializeDatabase();
        initilizeUser();
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

const TaskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: null },
    isCompleted: { type: String }
});

const jiraTaskSchema = new mongoose.Schema({
    email: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: null },
    status: { type: String }
})

const UserSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const Task = mongoose.model('Task', TaskSchema);
const User = mongoose.model('User', UserSchema);
const JiraTask = mongoose.model('JiraTask', jiraTaskSchema)

async function initializeDatabase() {
    try {
        // Check if the collection is empty
        const count = await JiraTask.countDocuments();
        if (count === 0) {
            console.log('Inserting sample tasks...');
            await JiraTask.insertMany(sample_tasks);
            console.log('Sample tasks inserted');
        }
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

async function initilizeUser() {
    try {
        // Check if the collection is empty
        const count = await User.countDocuments();
        if (count === 0) {
            console.log('Inserting sample tasks...');
            await User.insertMany(sample_user);
            console.log('sample user inserted');
        }
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

app.get('/api/task', async (req, resp) => {
    const { userId } = req.query;
    try {
        const tasks = await Task.find({ id: userId });
        resp.json(tasks);
    } catch (err) {
        resp.status(500).send(err);
    }
});

app.get('/api/task/search/:searchTerm', async (req, resp) => {
    try {
        const searchItem = req.params.searchTerm;
        const tasks = await Task.find({ name: new RegExp(searchItem, 'i') });
        resp.json(tasks);
    } catch (err) {
        resp.status(500).send(err);
    }
});

app.get('/api/task/:id', async (req, resp) => {
    // try {
    //     const taskId = req.params.id;
    //     const task = await Task.findById(taskId);
    //     resp.json(task);
    // } catch (err) {
    //     resp.status(500).send(err);
    // }
    const taskId = req.params.id;
    const task = sample_tasks.find(task => task.id === taskId);
    resp.send(task)
});

app.get('/api/task/tag/:tag', async (req, resp) => {
    // try {
    //     const myTag = req.params.tag;
    //     const tasks = await Task.find({ isCompleted: myTag === 'true' });
    //     resp.json(tasks);
    // } catch (err) {
    //     resp.status(500).send(err);
    // }
    const myTag = req.params.tag;
    const task = sample_tasks.filter(task => task.isCompleted === myTag);
    resp.send(task)
});

// delete a task by Id
app.delete('/api/task/:id', async (req, resp) => {
    const taskId = req.params.id;
    try {
        const result = await Task.deleteOne({ id: taskId })
        if (result.deletedCount === 1) {
            resp.status(200).send("Task Deleted Sucessfully")
        }
        else {
            resp.status(500).send("Error delting the Task")
        }
    } catch (error) {
        resp.status(500).send({ message: 'Error deleting task' });
    }

});

// Creating a new Task

app.post('/api/task/addNewTask', async (req, res) => {
    try {
        const newTask = req.body;
        const task = new Task(newTask);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/task/markAsComplete', async (req, resp) => {
    try {
        const markTask = req.body;
        const update = await Task.findOneAndUpdate(markTask, { isCompleted: 'Completed' });
        resp.status(200).send(update)
    } catch (error) {
        console.log("Error in Updaeing document!");

    }
});

app.post('/api/task/editTask', async (req, res) => {
    try {
        const updatedTask = req.body;

        const task = await Task.findOneAndUpdate(
            { id: updatedTask.id }, // Assuming you are using 'id' as the identifier
            updatedTask,
        );
        if (!task) {
            return res.status(404).send("Task not found");
        }

        res.status(200).json(task);
    } catch (error) {
        console.log("Error in updating document!", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/task/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        if (password !== user.password) {
            return res.status(400).send('Invalid credentials');
        }
        res.status(200).send(user);
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send('Server error');
    }
});

app.post('/api/task/register', async (req, resp) => {
    try {
        const newUser = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            return resp.status(400).send('User already exists');
        }
        const user = new User(newUser);
        await user.save();
        resp.status(201).json(user);
    } catch (err) {
        console.error("Error during user registration:", err);
        resp.status(500).send('Server error');
    }
});


// ---------------------------------JIRA PART-------------------------------------------------------

app.post('/api/jira/login', async (req, resp) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return resp.status(400).send('User not found');
        }
        if (password !== user.password) {
            return resp.status(400).send('Invalid credentials');
        }
        resp.status(200).send(user);
    } catch (err) {
        console.error("Error during login:", err);
        resp.status(500).send('Server error');
    }
});

app.post('/api/jira/register', async (req, resp) => {
    try {
        const newUser = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            return resp.status(400).send('User already exists');
        }
        const user = new User(newUser);
        await user.save();
        resp.status(201).json(user);
    } catch (err) {
        console.error("Error during user registration:", err);
        resp.status(500).send('Server error');
    }
});

app.get("/api/jira", async (req, resp) => {
    try {
        const task = await JiraTask.find();
        resp.status(200).json(task)
    } catch (error) {
        resp.status(500).send("errror fetching Admin-Data")
    }
});

app.post("/api/jira/addNewTask", async (req, resp) => {
    try {
        const newTask = req.body;
        const task = new JiraTask(newTask);
        await task.save();
        resp.status(201).json(task);
    } catch (err) {
        resp.status(500).send(err);
    }
});

app.get("/api/jira/getUserData", async (req, resp) => {
    const { userId } = req.query;
    try {
        const task = await JiraTask.find({ id: userId });
        resp.status(200).json(task)
    } catch (error) {
        resp.status(500).send("error fetching user data")
    }
});
app.delete('/api/jira/:id', async (req, resp) => {
    const taskId = req.params.id;
    try {
        const result = await JiraTask.deleteOne({ id: taskId })
        if (result.deletedCount === 1) {
            resp.status(200).send("Task Deleted Sucessfully")
        }
        else {
            resp.status(500).send("Error Deleting Task")
        }
    } catch (error) {
        resp.status(500).send({ message: 'Error deleting task' });
    }

});

app.post("/api/jira/editTask", async (req, resp) => {
    try {
        const updatedTask = req.body;
        const task = await JiraTask.findOneAndUpdate(
            { id: updatedTask.id }, //using 'id' as the identifier
            updatedTask,
        );
        if (!task) {
            return resp.status(404).send("Task not found");
        }
        resp.status(200).json(task);
    } catch (error) {
        resp.status(500).send("Internal Server Error");
    }
})

app.get("/api/jira/getExistingUsers", async (req, resp) => {
    try {
        const users = await User.find();
        resp.status(200).json(users)
    } catch (error) {
        resp.status(500).send("Error fetching Users")
    }
})

app.post('/api/jira/assignTask', async (req, res) => {
    try {
        const { _id, name, email } = req.body;

        const updatedUser = await JiraTask.findOneAndUpdate(
            { _id: _id },  // seatching the database against this _id
            { name: name, email: email }, // upadting the fields for the same
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

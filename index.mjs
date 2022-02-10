import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;
let URI = `mongodb+srv://admin:12345@nodejscluster01.u7jbf.mongodb.net/attendenceDB?retryWrites=true&w=majority`;
// let localURI = 'mongodb://localhost:27017/AMS_DB'
// call middleware
app.use(express.json());
app.use(cors());

//global middleware

// Connect to Database
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to database Successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const studentSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  RollNo: {
    type: String,
    required: true,
  },
  Batch: {
    type: String,
    required: true,
  },
  Semester: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

const attendenceSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  attendence: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
});

const Attendence = mongoose.model("Attendence", attendenceSchema);

// post Request student
app.post("/attendence", (req, res) => {
  const { id, attendence, date ,name } = req.body;

  let attendenceStd = {
    id,
    attendence,
    date,
    name
  };

  let studentAttendence = new Attendence(attendenceStd);

  studentAttendence.save((Error, Save) => {
    if (!Error) {
      return res.send("Student Attendence Add In DB Successfully");
    } else {
      return res.status(400).send("Something Went Wrong 🤦‍♂️");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Attendence Management System Server Online");
});

// Get All Students
app.get("/students", (req, res) => {
  Student.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.status(500).send("Something went wrong 😓");
    }
  });
});

// post Request student
app.post("/student", (req, res) => {
  const { Name, Course, RollNo, Semester, Batch } = req.body;

  let std = {
    Name,
    Course,
    RollNo,
    Semester,
    Batch,
  };

  let newStduent = new Student(std);

  newStduent.save((Error, Save) => {
    if (!Error) {
      return res.send("Student Add In DB Successfully");
    } else {
      return res.status(400).send("Something Went Wrong 🤦‍♂️");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

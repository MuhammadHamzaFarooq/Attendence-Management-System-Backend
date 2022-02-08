import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;
// let URI = `mongodb+srv://admin:12345@nodejscluster01.u7jbf.mongodb.net/attendenceDB?retryWrites=true&w=majority`;


// call middleware
app.use(express.json());
app.use(cors());

//global middleware

// Connect to Database
mongoose
  .connect(`mongodb://localhost:27017/AMS_DB`)
  .then(() => {
    console.log("Connected to database Successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const studentSchema = mongoose.Schema({
  Name: {
    type: String,
    isRequired: true,
  },
  Course: {
    type: String,
    isRequired: true,
  },
  RollNo: {
    type: String,
    isRequired: true,
  },
  Batch: {
    type: String,
    isRequired: true,
  },
  Semester: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
  res.send("Attendence Management System Server Online");
});

// post Request
app.post("/student", (req, res) => {
  res.send("Post Request "+req.body);
  console.log(req.body)

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

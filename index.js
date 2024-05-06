const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 3001;

console.log("App running");

app.listen(port);
app.use(express.json());

//Cors config - Security feature to restrict HTTP requests 
const corsOptions = {
  origin: [
    "https://example.here"
  ],
};

app.use(cors(corsOptions));

//Mutler config - Helps to handle multipart/form-data 
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

//Nodemailer config - Module to send emails 
let config = {
  service: "domain", // Your email domain e.g "gmail"
  auth: {
    user: "youremail@domain.com", // Your email address
    pass: "yourPasswordHere", // Your api password
  },
};
let transporter = nodemailer.createTransport(config);

// HTTP POST request
//Simple form example
app.post("/simple-form", (req, res) => { 

  console.log("New message received");

  // Extract data from the request body
  const data = req.body;

  // Create HTML content for the email
  const mailContent = `
        <p>New message received:</p>
        <p>First name: ${data.firstName}</p>
        <p>Last name: ${data.lastName}</p>
        <p>Email: ${data.email}</p>
        <p>Message: ${data.message}</p>
      `;

  const subjectName = `This is the subject of your email - ${data.firstName} ${data.lastName}`;

  let message = {
    from: "youremail@domain.com", // Sender address
    to: "destination@domain.com", // List of receivers, can be a list
    subject: subjectName, // Subject line
    html: mailContent, // Html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "Message sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: err });
    });
});

// HTTP POST request
//Example with pdf files attached
app.post("/form-with-pdf", upload.single("pdfFile"), (req, res) => {
  console.log("New message received with a pdf");

  // Extract data from the request body
  const data = req.body;

  // Create HTML content for the email
  const mailContent = `
        <p>This is a new message</p>
        <p>First name: ${data.firstName}</p>
        <p>Last name: ${data.lastName}</p>
        ${data.optionalData ? `<p>SomeData: ${data.optionalData}</p>` : ""}
      `;
  let attachment; // Initialize attachment variable

  //If a file has been sent, add it to the message attachments
  if (req.file) {
    const fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;

    attachment = {
      filename: fileName,
      content: fileBuffer, // Attach the file content directly
    };
  }

  const subjectName = `This is another email with a pdf file- ${data.firstName} ${data.lastName}`;

  let message = {
    from: "youremail@domain.com", // Sender address
    to: "destination@domain.com", // List of receivers, can be a list
    subject: subjectName, // Subject line
    html: mailContent, // Html body
    attachments: attachment ? [attachment] : [], // Add attachment if available
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "Message sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: err });
    });
});

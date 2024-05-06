# Email Sending API with Express, Nodemailer, and Multer ✉️📫
This project demonstrates how to create a simple API using Express to send emails with attachments using Nodemailer and Multer. It includes two endpoints: one for sending a simple email and another for sending an email with a PDF attachment.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) 

## Installation

1. Clone this repository
2. Navigate into the project directory
3. Install dependencies with `npm install` or  `yarn install`

## Usage
1. Configure your email settings in the app.js file:
 Clone this repository:

   ```javascript
   let config = {
      service: "domain", // Your email domain e.g "gmail"
      auth: {
      user: "youremail@domain.com", // Your email address
      pass: "yourPasswordHere", // Your api password
      },
   };
   
   let transporter = nodemailer.createTransport(config);
   ```
2. Start the server:
 `npm start` or  `yarn start`

3. Use the provided endpoints to send emails:

   * __POST /simple-form:__ Send a simple email with form data.
   * __POST /form-with-pdf:__ Send an email with a PDF attachment.

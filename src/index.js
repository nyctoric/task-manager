const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ', port);
});

// const Task = require('./models/task');
// const User = require('./models/user');



//register new middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//       res.send('GET requests are disabled');
//     } else {
//       next();
//     }
// });

// app.use((req, res, next) => {
//   res.status(503).send('site down for maintenance');
// });


// const main = async () => {
//   // const task = await Task.findById('5eb4050a482a91879469c720');
//   // await task.populate('owner').execPopulate();
//   // console.log(task.owner);
//
//   const user = await User.findById('5eb4031080ec52794c5f92ca');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };
//
// // main();




// const pet = {
//   name: 'Hal'
// }
//
// pet.toJSON = function () {
//   const text = this.name;
//   return {foo: "his name is "+text};
// };
//
// console.log(JSON.stringify(pet));

// const multer = require('multer');
// const upload = multer({
//   limits: {
//     fileSize: 1000000
//   } ,
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please upload a Word Document File'));
//     }
//     cb(undefined, true);
//   }
// });
//
// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message});
// });

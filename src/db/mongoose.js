const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_CONNECT_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

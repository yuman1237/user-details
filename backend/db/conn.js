const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://yuman1237:YuM@1997@cluster0.k84um.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connection is Sucessful`);
  })
  .catch((e) => {
    console.log(`No Connection`);
  });

import mongoose from "mongoose";

export function dbConnection() {
  const dbUrl = "mongodb://localhost:27017/MyBlog";

  return () => {
    mongoose.connect(dbUrl).then(
      () => {
        console.log("DB connected");
      },
      (err) => {
        console.log("error", err);
      }
    );
  };
}

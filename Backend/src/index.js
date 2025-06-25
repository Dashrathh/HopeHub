import { app, port } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.info(
        `⚙️ Hope Hub is running at http://localhost:${port} in ${app.settings.env} mode`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

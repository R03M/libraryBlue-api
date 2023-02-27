import "dotenv/config";
import server from "./app.js";
import { syncDB } from "./src/db/index.js";

const { PORT } = process.env;

syncDB()
  .then(() => console.log("Synchronized database"))
  .catch((error) => console.log(`Database synchronization failed => ${error}`));

server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

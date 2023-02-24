import "dotenv";
import server from "./app";
import { syncDB } from "./db";

const { PORT } = process.env;

syncDB()
  .then(() => console.log("Synchronized database"))
  .catch((error) => console.log(`Database synchronization failed => ${error}`));

server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

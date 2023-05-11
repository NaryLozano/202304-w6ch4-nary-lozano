import * as dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import app from "./server/index.js";

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${chalk.greenBright(`http://localhost:${port}`)} `);
});

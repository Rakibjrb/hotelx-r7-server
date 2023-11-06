const app = require("./app");
const port = process.env.PORT || 5000;

const serverHandler = () => {
  console.log(`[+] server started .....`);
  console.log(`[+] running on : http://localhost:${port}`);
};
app.listen(port, serverHandler);

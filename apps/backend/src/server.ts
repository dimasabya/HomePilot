import "dotenv/config";
import app from "./app";

const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});

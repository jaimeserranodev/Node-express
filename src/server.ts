import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;
export const serverInstance = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default serverInstance;
import express from "express"
import morgan from "morgan"
import cors from "cors"
import router from "./routes/index.js"

const app = express()
const port = process.env.PORT || 3000
export const JWT_SECRET = "123456"
export const saltrounds = 10;

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use("/api/v1",router);

app.listen(port,()=>{
    console.log(`Server Running On http://localhost:${port}`)
})

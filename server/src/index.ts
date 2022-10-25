require("dotenv").config()

import express, { Request, Response, NextFunction } from "express"
import router from "./api";
import { connectDb } from "./config/db";
import { useLogger } from "./config";
import path from "path";


const app = express();
const port = process.env.PORT ?? 5000

const start = async () => {
   try {
      await connectDb()
      app.listen(port)
      useLogger(app)
      app.use(express.json())

      if (process.env.NODE_ENV === 'production') {
         const clientDir = path.resolve(__dirname, '../..', 'client', 'dist')
         app.use(express.static(clientDir))

         app.get('/', (req: Request, res: Response, next: NextFunction) => {
            const pathToClientFile = path.join(clientDir, 'index.html')

            return res.sendFile(pathToClientFile)
         })
      }

      app.use('/', router)
   } catch (e) {
      console.error(String(e))
      process.exit(1)
   }
}


start()

import { connect, ConnectOptions } from "mongoose"

const connectDb = async () => {
   await connect(process.env.DB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   } as ConnectOptions)
   return 'MongoDB Connected'
}

export { connectDb }
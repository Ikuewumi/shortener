import { model, Schema } from 'mongoose'
import { DbUrlModel } from 'shortener'

const y = new Schema<DbUrlModel>({
   longUrl: String,
   shortUrl: String,
   urlCode: String,
   time: String
})
const m = model('links', y)

export { m as UrlModel }
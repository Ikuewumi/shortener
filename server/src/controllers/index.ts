import { FilterQuery, isValidObjectId } from "mongoose";
import { DbUrlModel } from "shortener";
import { connectDb } from "../config/db";
import { UrlModel } from "../models/Url";
import { Url } from "node:url"
const validUrl = require("valid-url");
const shortId = require("shortid");


export const queryDb = async (query: FilterQuery<DbUrlModel>) => {
   const found = await UrlModel.findOne(query)
   if (isValidObjectId(found?._id)) {
      return found
   }
   return null
}


export const checkUrl = async (longUrl: string) => {
   const isValid = validUrl.isUri(longUrl)
   if (!isValid) throw Error('invalid url')
   const longUrlValid = await queryDb({ longUrl })

   if (longUrlValid) {
      return longUrlValid
   }

   return true

}

export const createNewDbUrl = async (props: { longUrl: string, urlCode: string }) => {
   const newObj = new UrlModel({
      longUrl: props.longUrl,
      urlCode: props.urlCode,
      shortUrl: `${process.env.BASE_URI}/${props.urlCode}`,
      time: Date.now()
   })

   const result = await newObj.save()

   return result
}


export const generateUrlCode = async (url: string) => {
   const newCode = shortId.generate()
   const newCodeValid = await queryDb({ urlCode: newCode })
   const longUrlInDb = await queryDb({ longUrl: url })
   if (longUrlInDb) {
      return longUrlInDb
   }
   if (newCodeValid) {
      generateUrlCode(url)
   }
   return createNewDbUrl({
      longUrl: url,
      urlCode: newCode
   })
}


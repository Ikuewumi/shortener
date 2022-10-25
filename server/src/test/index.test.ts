import { describe, it, expect } from "vitest";
import { connectDb } from "../config/db";
import { checkUrl, generateUrlCode } from "../controllers";

describe('Connecting to the Database...', () => {
   it('Connect to mongoDB', async () => {
      expect(await connectDb()).toBe('MongoDB Connected')
   })
})

describe('Functions to generate id from urls...', () => {

   it('check if url is valid', async () => {
      expect(await checkUrl(process.env.TEST_URI!)).toStrictEqual(true)
   })

   it('generate a new document for a link', async () => {
      expect(await generateUrlCode(process.env.TEST_URI!)).toHaveProperty('_id')
   })

})


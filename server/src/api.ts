import { Request, Response, Router } from "express"
import { isValidObjectId } from "mongoose"
import { sendMsg, sendObject } from "./config"
import { checkUrl, generateUrlCode, queryDb } from "./controllers"

const router = Router()

router.get('/:code', async (req: Request, res: Response) => {

   try {
      const result = await queryDb({ urlCode: req.params.code })
      if (!(result && isValidObjectId(result?._id))) throw Error('url not found')

      res.redirect(result?.longUrl)

   }
   catch (err) { return sendMsg(res, 'The url doesnot exist', 404) }


})

router.post('/shorten', async (req: Request, res: Response) => {

   try {
      const { longUrl } = req.body as { longUrl: string }
      const longUrlValid = await checkUrl(longUrl)

      if (longUrlValid === true) {
         const newObject: any = await generateUrlCode(longUrl)
         return sendObject(res, newObject)
      }

      return sendObject(res, longUrlValid)
   }
   catch (err) { return sendMsg(res, String(err), 500) }

})


export default router
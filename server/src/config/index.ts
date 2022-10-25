import { Response, Express } from "express"
const morgan = require('morgan')

/**
 * Sends a message to the user
 * @param res {Response} The express response object
 * @param msg {string} The message to be sent
 * @param code {number} The statusCode
 * 
 * @returns {?}
 */
export const sendMsg = (res: Response, msg: string, code: number = 200): any => {
   return res.status(code).json({
      msg
   })
}

/**
 * Sends an object to the user
 * @param res {Response} The express response object
 * @param msg {object} The message to be sent
 * @param code {number} The statusCode
 * 
 * @returns {?}
 */
export const sendObject = (res: Response, msg: { [index: string]: any }, code: number = 200): any => {
   return res.status(code).json(msg)
}

export const useLogger = (app: Express) => {
   if (process.env.NODE_ENV !== 'production') {
      app.use(morgan('dev'))
   }
}
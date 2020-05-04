import { get, controller, post, use } from './decorator'
import { Request, Response, NextFunction } from 'express'
import { getResponseData } from '../utils/util'
import Crowller from '../utils/crowller'
import CoderAnalyzer from '../utils/analyzer'
import path from 'path'
import fs from 'fs'

import 'reflect-metadata'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false

  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

@controller
class CorwllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const url = `http://www.feigang.net/`

    const coderAnalyzer = CoderAnalyzer.getInstance()
    new Crowller(url, coderAnalyzer)
    res.json(getResponseData(true))
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: RequestWithBody, res: Response) {
    try {
      const jsonPath = path.resolve(__dirname, '../../data/result.json')
      const content = fs.readFileSync(jsonPath, 'utf-8')
      res.json(getResponseData(JSON.parse(content)))
    } catch (e) {
      res.json(getResponseData(false, '数据不存在'))
    }
  }
}
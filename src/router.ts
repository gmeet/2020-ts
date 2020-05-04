import { Router, Request, Response, NextFunction } from 'express'
import Crowller from './utils/crowller'
import CoderAnalyzer from './utils/analyzer'
import path from 'path'
import fs from 'fs'
import { getResponseData } from './utils/util'

const router = Router()

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


router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false

  if (isLogin) {
    res.send(`<html>
    <body>
      <a href="./logout">退出</a>
      <a href="./getData">爬取内容</a>
      <a href="./showData">展示内容</a>
      </body>
    </html>`)
  } else {
    res.send(`<html>
      <body>
      <form method="post" action="./login">
        <input type="password" name="password" />
        <button>登录</button>
      </form>
      </body>
    </html>`)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }

  res.json(getResponseData(true))
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.json(getResponseData(true, '已经登录过了'))
  } else {
    if (password === '123') {
      if (req.session) {
        req.session.login = true
        res.json(getResponseData(true, '登录成功'))
      }
    } else {
      res.json(getResponseData(true, '登录失败'))
    }
  }
})

router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
  const url = `http://www.feigang.net/`

  const coderAnalyzer = CoderAnalyzer.getInstance()
  new Crowller(url, coderAnalyzer)
  res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
  try {
    const jsonPath = path.resolve(__dirname, '../data/result.json')
    const content = fs.readFileSync(jsonPath, 'utf-8')
    res.json(getResponseData(JSON.parse(content)))
  } catch (e) {
    res.json(getResponseData(false, '数据不存在'))
  }
})

export default router
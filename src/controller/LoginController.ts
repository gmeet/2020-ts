import { get, controller, post } from './decorator'
import { Request, Response } from 'express'
import { getResponseData } from '../utils/util'

import 'reflect-metadata'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller
class LoginController {
  @get('/logout')
  logout(req: RequestWithBody, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }

    res.json(getResponseData(true))
  }
  @post('/login')
  login(req: RequestWithBody, res: Response) {
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
  }

  @get('/')
  home(req: RequestWithBody, res: Response) {
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
  }
}


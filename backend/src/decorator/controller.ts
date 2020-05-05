import { RequestHandler } from 'express'
import { router } from '../router'
import { Methods } from './request'

export function controller(prePath: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key)
      const handler = target.prototype[key]
      if (path && method) {
        const fullPath = prePath === '/' ? path : `${prePath}${path}`
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}


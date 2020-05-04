import { RequestHandler } from 'express'
import { CorwllerController, LoginController } from '../controller'

type ControllerType = CorwllerController | LoginController

export function use(middleware: RequestHandler) {
  return function (target: ControllerType, key: string) {
    const originMiddlewares = Reflect.getMetadata('midllewares', target, key) || []
    originMiddlewares.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
  }
}
import fs from 'fs'
import cheerio from 'cheerio'
import { Analyzer } from './crowller'

interface Infos {
  address: string,
  name: string
  price: string
  upOrDown: string
}

interface Result {
  time: number,
  data: Infos[]
}

interface Content {
  [propName: number]: Infos[]
}

export default class CoderAnalyzer implements Analyzer {
  private static instance: CoderAnalyzer

  static getInstance() {
    if (!this.instance) {
      this.instance = new CoderAnalyzer()
    }

    return this.instance
  }

  private constructor() { }

  private generateJsonContent(result: Result, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }

    fileContent[result.time] = result.data
    return fileContent
  }

  private getInfo(html: string) {
    const $ = cheerio.load(html)
    const trItems = $('.f1_tbl').find('tr')
    const infos: Infos[] = []

    trItems.map((index, element) => {
      const address = $(element).find('td').eq(0).text()
      const name = $(element).find('td').eq(1).text()
      const price = $(element).find('td').eq(2).text()
      const upOrDown = $(element).find('td').eq(3).text()

      infos.push({
        address,
        name,
        price,
        upOrDown
      })
    })

    return {
      time: (new Date()).getTime(),
      data: infos
    }
  }

  public analyze(html: string, filePath: string) {
    const data = this.getInfo(html)
    const fileContent = this.generateJsonContent(data, filePath)
    return JSON.stringify(fileContent, undefined, '  ')
  }
}
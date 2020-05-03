import path from 'path'
import fs from 'fs'
import superagent from 'superagent'
import CoderAnalyzer from './analyzer';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/result.json')
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }

  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
}


const url = `http://www.feigang.net/`

const coderAnalyzer = CoderAnalyzer.getInstance()
new Crowller(url, coderAnalyzer)
console.log('1293')
//////! НУЖНА NODE JS >> v18
import { createReadStream, createWriteStream } from 'node:fs'
import fs from 'node:fs/promises'
import { createInterface } from 'node:readline/promises'

// const rl = require('node:readline/promises')
// const { log } = require('node:console')
// const fs = require('node:fs/promises')


const testFile = './files/test.txt'
const replFile = './files/repl.txt'

const findText = 'Hallo!!! '
const replaceText = 'OKEYOKEYOKEYOKEY'


const app = async (path) => {
  log('hello lets read', testFile)
  
  // const result = await fs.readFile(testFile, { encoding: 'utf8'})
  
  const reg = new RegExp(findText, 'g')
  console.log('reg: ', reg);
  // const replaced = result.replace(reg, replaceText)
  
  const rStream = createReadStream(testFile);
  const rl = createInterface({
      input: rStream,
      output: createWriteStream('testwrite.txt'),
      crlfDelay: Infinity,      
    }
  )
  
  log("построчное чтение через for await")
  
  for await (const line of rl) {
    log(line)
  }
  
  return true;
}

app()
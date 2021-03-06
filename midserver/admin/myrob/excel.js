/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
const fs = require('fs')
let XLSX = require('xlsx')
let workbook
const inquirer = require('inquirer');

// constructor
class excel {
  constructor() {
    // Default options
    this.options = {
      direxcel: './static/excel/',
      rowkey: ['A', 'B', 'C', 'F', 'G', 'L', 'M', 'P', 'S']
    }
  }

  getfile() {
    let myfilepath = this.options.direxcel
    let filebox = []
    if (fs.existsSync(myfilepath)) {
      let paths = fs.readdirSync(myfilepath)
      if (paths.length) {
        paths.forEach(function (path, index) {
          let _myfilepath = myfilepath + path

          let file = fs.statSync(_myfilepath)
          let isexcel = path.indexOf('.xls') !== -1
          if (file.isFile() && isexcel) {
            filebox.push(path)
          }
        })
      } else {
        console.log('dir is empty!')
      }
    }

    return filebox
  }

  infor(excel) {
    let myfs = this.options.direxcel + excel
    console.log('curr file is : ' + myfs)
    let datalist = {}
    if (fs.existsSync(myfs)) {
      workbook = XLSX.readFile(myfs)
      datalist.excel = this.getexcel()
      datalist.filename = excel.split('-')[0]
    } else {
      console.log('excel file is not exist!please make sure your file!!')
    }
    return datalist
  }

  boot(filelist) {
    return new Promise(resolve => {
      let self = this
      const promptList = [{
        type: 'list',
        message: '请选择需要解析的Excel:',
        name: 'excel',
        choices: filelist
      }];

      inquirer.prompt(promptList).then(a => {
        let data = self.infor(a.excel)
        resolve(data)
      })
    })
  }

  getexcel() {
    let sheetNameList = workbook.SheetNames
    let datalist = []
    let rowkey = this.options.rowkey
    let mynumlist = []
    sheetNameList.forEach(function (y) { /* iterate through sheets */
      let worksheet = workbook.Sheets[y]
      for (let z in worksheet) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if (z[0] === '!') continue
        let Letter = z.replace(/[0-9]/g, '')
        let isrow = rowkey.indexOf(Letter)
        if (isrow !== -1) {
          let num = z.replace(/[A-Z]/g, '')
          if (num > 1) {
            let numindex = mynumlist.indexOf(num)
            if (numindex === -1) {
              mynumlist.push(num)
              datalist.push({ A: worksheet[z].v })
            } else {
              datalist[numindex][Letter] = worksheet[z].v
            }
          }
        }
      }
    })

    return datalist
  }
}

module.exports = excel

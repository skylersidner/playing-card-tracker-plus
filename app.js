const express = require('express')
const path = require('path')
// const fs = require('fs').promises;

const app = express()
const port = 3000
const staticPath = path.join(__dirname, '/src');

/*
  This allows for convention, where resources can be fetched by their path;
i.e. /settings/settings.html will pull the file in the /src/settings directory
named "settings.html"
  This also supports the convention that "index.html" in the root directory (/src)
will be fetched for the root path (/)
 */
app.use(express.static(staticPath));


// TODO: explore why this causes href and src files requested by the html page
//  to all come back with "text/html" MIME type (which causes 404s and errors).
// app.get('/index', function (req, res) {
//   try {
//     console.log('__dirname: ', staticPath)
//     const result = fs.readFile(staticPath + "/index.html")
//         .then(contents => {
//           console.log('the readFile happened...')
//           // res.setHeader("Content-Type", "text/html")
//           res.writeHead(200);
//           res.end(contents)
//         })
//         .catch(err => {
//           console.log('error while loading file: ', err)
//           res.writeHead(500)
//           res.end(err)
//           return
//         });
//     console.log('the end happened...')
//     return result
//   } catch (e) {
//     console.log('an error occurred: ', e)
//     return e
//   }
//   return
// })

app.listen(port, () => {
  console.log(`Playing-card-tracker-plus listening at http://localhost:${port}`)
})
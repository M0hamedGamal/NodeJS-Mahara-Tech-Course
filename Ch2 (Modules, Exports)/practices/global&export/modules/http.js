const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3005

const students = [
    {id: 1, name: 'Student 1'},
    {id: 2, name: 'Student 2'},
    {id: 3, name: 'Student 3'},
]

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    console.log(url)
    console.log(method)

    switch (url) {
        case '/':
            res.write('<h1>Welcome Root</h1>')
            res.end()
            break
        case '/home':
            fs.readFile('../../../public/home.html', 'utf8', (err, data) => {
                if (err) return console.error(err)

                res.write(data)
                res.end()
            })
            break
        case '/main.css':
            fs.readFile('../../../public/main.css', 'utf8', (err, data) => {
                if (err) return console.error(err)

                res.writeHead(200, {'Content-Type': "text/css"})
                res.write(data)
                res.end()
            })
            break
        case '/about':
            fs.readFile('files/fileTwoTxt.txt', 'utf8', (err, data) => {
                if (err) return console.log(err)

                res.write(data)
                res.end()
            })
            break
        case '/students':
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(students))
            res.end()
            break

        default:
            res.statusCode = 404
            res.end()
    }

})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
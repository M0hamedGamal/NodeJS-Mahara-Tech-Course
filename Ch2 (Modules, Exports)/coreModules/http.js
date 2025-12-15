const http = require('http')
const fs = require('fs')

const students = [
    {id: 1, name: 'Ali', dept: 'PD'},
    {id: 2, name: 'Gemy', dept: 'SA'},
    {id: 3, name: 'Badr', dept: 'MD'},
]

const server = http.createServer()

server.on('request', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    console.log('Request is received...')


    switch (req.url) {
        case '/':
            res.write('Hello from Root page')
            res.end()
            break

        case '/abc':
            res.write('<h1>Hello from ABC page</h1>')
            res.end()
            break

        case '/home':
            fs.readFile('../public/home.html', (err, data) => {
                if (err) return console.log(err)

                res.write(data)
                res.end()
            })
            break
        case '/main.css':
            fs.readFile('../public/main.css', (err, data) => {
                if (err) return console.log(err)

                res.writeHead(200, {'Content-Type': 'text/css'})
                res.write(data.toString())
                res.end()
            })
            break

        case '/api/students':
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(students))
            res.end()
            break

        default:
            res.statusCode = 404
            /**
             * setHeader => set one Key-Value pair only
             * writeHead => set (status, object of Key-Value pairs)
             * */
            // res.setHeader('Content-Type', 'text/html')
            // res.writeHead(404, {'Content-Type': 'text/html'})
            res.end()
    }
})


server.listen(3001, () => {
    console.log('Listening to port 3001...!')
})
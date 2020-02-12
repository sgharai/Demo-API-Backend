const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
let cors = require('cors')

let apples = {name:'apples', amount:4}

app.use(cors())

app.get('/', (req, res) => res.send("Hi Sofia~"))
app.get('/data', (req, res) => res.json(apples))
app.use(express.static('./'))

app.listen(port, () => console.log("Hi Sofia~"))

let schema = buildSchema(`
    type Query {
        hello: String
    }
`);

let root = { hello: () => 'Hello world!'}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


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
        women: User
    }

    type User {
        _id: ID
        name: String
        gender: String
    }
`);

// let db = {
//     a: {
//         name:'alpha'
//     },
//     b:{
//         name:'beta'
//     }
// }

let root = { 
    // hello: () => "Hello world!",
    women: () => women
}

let women = {
    whitney : {
        "_id": "5e446ccdeeda84bfeccb0a9e",
        "name": "Whitney Rojas",
        "gender": "female"
      },
     harriet: {
        "_id": "5e446ccd2fa2bb2c21185453",
        "name": "Harriet Velazquez",
        "gender": "female"
      },
     jewell: {
        "_id": "5e446ccd6a47a8360a7f74ce",
        "name": "Jewell Hines",
        "gender": "female"
      },
      saundra: {
        "_id": "5e446ccd0add1868d72cf096",
        "name": "Saundra Payne",
        "gender": "female"
      },
      bettye : {
        "_id": "5e446ccd135fa659817bb7b6",
        "name": "Bettye Wiggins",
        "gender": "female"
      }
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


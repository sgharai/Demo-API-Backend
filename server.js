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
  type User {
    id: ID
    name: String
  }
  type Query {
    hello: String
    user(id: Int):User
    users:[User]
  }
`);

let users = [

    {
     id:"0",
     name:"mike",
   },
    {
     id:"1",
     name:"al",
   },
    {
     id:"2",
     name:"jen",
   }
 ]
 
 // let fruitDB = {
 //   {
 //     id:0
 //   }
 
 // }

 let root = {
    hello: () => {
        return 'Hello world!';
    },
    users: () => {
        return users;
    },
    user: ({id}) => {
        return users[id];
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


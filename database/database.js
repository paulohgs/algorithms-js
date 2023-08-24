import pkg from 'pg'
import 'dotenv/config'
const Client = pkg.Client

const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASS 
})

async function insert_user(name, password) {
    await client.connect()
    const query = `INSERT INTO "users" (nome, senha) VALUES ('${name}', '${password}')`
    try {
        await client.query(query)
        return true
    } catch (error) {
        console.error(error.stack)
        return false
    } finally {
        await client.end()
    }
}

async function main() {
    console.log('Iniciando programa...')
    const res = insert_user('ph', 'teste4')
    if (res) {
        console.log(`Operação realizada com sucesso.`)
    }
}

main()

import cors from 'cors'
import express, { request, response } from 'express'

import { convert } from './convert.js'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const server_port = 3333

const app = express()
app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (req, res) => {
  try {
    const videoId = req.params.id
    await download(videoId)
    const audioConverted = await convert()
  
    const result = await transcribe(audioConverted)
    return res.json( { result } )
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.post('/summary', async (req, res) => {
  try {
    const result = await summarize(req.body.text)
    return res.json({ result })
    
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.listen(server_port, () => {
  console.log(`Servidor iniciou na porta ${server_port}!`)
})
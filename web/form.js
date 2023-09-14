import { server } from "./server.js"

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const contentSummarize = document.querySelector("#content-summarize")
const contentTranscription = document.querySelector("#content-transcription")
const botaoResumir = document.querySelector('#resumir')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  contentSummarize.classList.add("placeholder")
  contentTranscription.classList.add("placeholder")
  botaoResumir.disabled = true
  input.disabled = true

  const videoURL = input.value
  

  if(!videoURL.includes('shorts')){
    contentTranscription.textContent = "Esse vídeo não parece ser um short do Youtube!"
    botaoResumir.disabled = false
    input.disabled = false
    return (contentSummarize.textContent = contentTranscription.textContent)
  }

  const [,params] = videoURL.split("/shorts/")
  const [videoIdYoutube] = params.split('?')
  console.log(videoIdYoutube)

  contentSummarize.textContent = "Obtendo o resumo do áudio..."
  contentTranscription.textContent = "Obtendo a transcrição do áudio..."


  const transcription = await server.get(`/summary/${videoIdYoutube}`)

  contentSummarize.textContent = 'Realizando o resumo...'
  contentTranscription.textContent = "Realizando a transcrição..."

  const summary = await server.post('/summary', {
    text: transcription.data.result
  })

  contentSummarize.textContent = summary.data.result
  contentTranscription.textContent = transcription.data.result
  contentSummarize.classList.remove('placeholder')
  contentTranscription.classList.remove("placeholder")
  botaoResumir.disabled = false
  input.disabled = false
})
import EasySpeech from './EasySpeech.js'

document.body.onload = async () => {
 
 
  const initialized = await init()
  await populateVoices(initialized)
  initInputs(initialized)
  await initSpeak(initialized)
  initEvents(initialized)
}

let logBody
let filteredVoices

const values = {
  voice: undefined,
  
  text: undefined
}

const inputs = {

 
  text: undefined,
  language: undefined,
  voice: undefined
}

function initInputs (initialized) {
  if (!initialized) return

  

  inputs.text = document.querySelector('#text-input')
  inputs.text.disabled = false
}

function getValues () {
  return { ...values }
}



async function init () {
 

  let success
  let message
  let summary
  try {
    success = await EasySpeech.init()
  
  } catch (e) {
    success = false
  
    const speakBtn = document.querySelector('.speak-btn')
    speakBtn.classList.add('disabled')
    speakBtn.setAttribute('disabled', '')
  } finally {
  

  
  }

  return success
}

async function populateVoices (initialized) {
  if (!initialized) return


  const voices = EasySpeech.voices()
  const languages = new Set()
  let defaultLang
  let defaultURI

  voices.forEach((voice, index) => {
    const lang = voice.lang.split(/[-_]/)[0]
    languages.add(lang)

    if (voice.default) {
      defaultLang = lang
      defaultURI = voice.voiceURI
    }
  })



  inputs.language = document.querySelector('#lang-select')
  Array.from(languages).sort().forEach(lang => {
    const option = textNode(lang, 'option')
    option.setAttribute('value', lang)

    if (defaultLang && lang === defaultLang) {
      option.setAttribute('selected', '')
      setTimeout(() => updateVoiceSelect(voices, lang, defaultURI), 250)
      setTimeout(() => {
        const index = filteredVoices.findIndex(v => v.voiceURI === defaultURI)
        selectVoice(index + 1)
      }, 500)
    }

    inputs.language.appendChild(option)
  })


  inputs.voice = document.querySelector('#voice-select')

  inputs.language.addEventListener('change', (e) => updateVoiceSelect(voices, e.target.value))

  inputs.voice.addEventListener('change', e => {
    const index = Number.parseInt(e.target.value, 10)
    selectVoice(index)
  })

  inputs.language.classList.remove('disabled')
  inputs.language.removeAttribute('disabled')
}

function updateVoiceSelect (voices, value, defaultURI) {
  while (inputs.voice.firstChild) {
    inputs.voice.removeChild(inputs.voice.lastChild)
  }

  inputs.voice.appendChild(textNode('(Select voice)', 'option'))

  if (value) {
    filteredVoices = value === 'all'
      ? voices
      : voices.filter(voice => (
        voice.lang.indexOf(`${value}-`) > -1 ||
          voice.lang.indexOf(`${value}_`) > -1))
        .sort((a, b) => a.name.localeCompare(b.name))

    filteredVoices.forEach((voice, index) => {
      const service = voice.localService ? 'local' : 'remote'
      const isDefault = voice.default ? '[DEFAULT]' : ''
      const voiceName = `${isDefault}${voice.name} - ${voice.voiceURI} (${service})`
      const option = textNode(voiceName, 'option')
      option.setAttribute('value', index.toString(10))

      if (defaultURI && defaultURI === voice.voiceURI) {
        option.setAttribute('selected', '')
      }

      inputs.voice.appendChild(option)
    })

    inputs.voice.classList.remove('disabled')
    inputs.voice.removeAttribute('disabled')
  } else {
    inputs.voice.classList.add('disabled')
    inputs.voice.disabled = true
    values.voice = null
    filteredVoices = null
  }
}

function selectVoice (index) {
  if (index < 0 || index > filteredVoices.length - 1) {
    values.voice = undefined
    return
  }

  values.voice = (filteredVoices || [])[index]
}

function initSpeak (inititalized) {
  if (!inititalized) return

  const speakButton = document.querySelector('.speak-btn')
  const allInputs = Object.values(inputs)

  speakButton.addEventListener('click', async event => {
    speakButton.disabled = true
    
    const { pitch, rate, voice, volume } = getValues()
    const text = inputs.text.value

    try {
      await EasySpeech.speak({ text, pitch, rate, voice, volume })
    } catch (e) {
  
    } finally {
      speakButton.disabled = false
     
    }
  })
}



function initEvents (initialized) {
  if (!initialized) return

  const logEvent = e => console.log(`event: ${e.type}`)
  EasySpeech.on({
    boundary: logEvent,
    start: logEvent,
    end: logEvent,
    error: logEvent
  })
}

// HELPERS

const textNode = (text, parent = 'div') => {
  const entry = document.createElement(parent)
  entry.appendChild(document.createTextNode(text))
  return entry
}

let handler = async (m, { conn}) => {
let user = global.db.data.users[m.sender]
let name = conn.getName(m.sender)
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let av = `./Assets/ram/${pickRandom(["ram", "ram1", "ram2", "ram3", "ram4", "ram5", "ram6", "ram7", "ram8"])}.mp3`
m.react('🕉️')

m.reply( `Jay Jay Sree Ram 🚩`)
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
} 

handler.customPrefix = /^(Jay sri ram|Ram Ram|Hunuman|Jay sree ram|ram|raja ram|Jai shree ram)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
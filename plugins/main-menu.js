import { promises, readFileSync } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'

let groupmenu = `
   ✦ ───『 *group* 』─── ⚝
  ◈ .getbio <@tag/reply>  Ⓛ
  ◈ .animequote
  ◈ .Setdesc <text>
  ◈ .setname <text>
  ◈ .add
  ◈ .delete
  ◈ .delwarn @user
  ◈ .demote (@tag)
  ◈ .infogp
  ◈ .hidetag
  ◈ .invite <917xxx>
  ◈ .kick @user
  ◈ .link
  ◈ .poll question|option|option
  ◈ .profile
  ◈ .promote
  ◈ .resetlink
  ◈ .setbye <text>
  ◈ .group *open/close*
  ◈ .setwelcome <text>
  ◈ .simulate <event> @user
  ◈ .staff
  ◈ .tagall
  ◈ .totag
  ◈ .warn @user
  ◈ .warns
  ◈ .main
  ╰──────────⳹`

let ownermenu = `
  ✦ ───『 *owner* 』─── ⚝
  ◈ .addprem <@tag>
  ◈ .addowner @user
  ◈ .allow <@tag>
  ◈ .HEROKU
  ◈ .ban @user
  ◈ .banchat
  ◈ .tx
  ◈ .broadcastgroup <text>
  ◈ .bcgc <text>
  ◈ .cleartmp
  ◈ .delexpired
  ◈ .delprem @user
  ◈ .removeowner @user
  ◈ .setppbotfull
  ◈ .getplugin <name file>
  ◈ .getfile <name file>
  ◈ .join <chat.whatsapp.com> <dias>
  ◈ .reset <54xxx>
  ◈ .resetprefix
  ◈ .restart
  ◈ ..setprefix
  ◈ ..setprefix [symbol]
  ◈ .unban @user
  ◈ .unbanchat
  ◈ .update
  ◈ .config
  ◈ .listban
  ◈ .deleteplugin <name>
  ╰──────────⳹`

let funmenu = `
  ✦ ───『 *fun* 』─── ⚝
  ◈ .afk <reason>
  ◈ .tomp3
  ◈ .toav
  ◈ .bot
  ◈ .character @tag
  ◈ .dare
  ◈ .flirt
  ◈ .gay @user
  ◈ .pickupline
  ◈ .question
  ◈ .shayari
  ◈ .ship
  ◈ .yomamajoke
  ◈ .truth
  ◈ .waste @user
  ◈ .image
  ◈ .meme
  ◈ .quote
  ◈ .Family @user
  ◈ .Family2 @user
  ◈ .pick <Number> <text>
  ╰──────────⳹`

let reactmenu = `
  ✦ ───『 *reaction* 』─── ⚝
  ◈ .bully @tag
  ◈ .cuddle @tag
  ◈ .cry @tag
  ◈ .hug @tag
  ◈ .awoo @tag
  ◈ .kiss @tag
  ◈ .lick @tag
  ◈ .pat @tag
  ◈ .smug @tag
  ◈ .bonk @tag
  ◈ .yeet @tag
  ◈ .blush @tag
  ◈ .smile @tag
  ◈ .wave @tag
  ◈ .highfive @tag
  ◈ .handhold @tag
  ◈ .nom @tag
  ◈ .bite @tag
  ◈ .glomp @tag
  ◈ .slap @tag
  ◈ .kill @tag
  ◈ .happy @tag
  ◈ .wink @tag
  ◈ .poke @tag
  ◈ .dance @tag
  ◈ .cringe @tag
  ╰──────────⳹`

let dlmenu = `
  ✦ ───『 *downloader* 』─── ⚝
  ◈ .facebook <url>
  ◈ .gdrive 🅟
  ◈ .gitclone <url>
  ◈ .igstalk
  ◈ .instagram
  ◈ .mediafire <url>
  ◈ .mega
  ◈ .modapk
  ◈ .play <query>
  ◈ .play2 <text>
  ◈ .playvid <text>
  ◈ .spotify
  ◈ .tiktok <url>
  ◈ .tiktokstalk
  ◈ .twitter <url>
  ◈ .ytmp3 <url>
  ◈ .ytsearch
  ◈ .ytmp4 <yt-link>
  ◈ .wallpaper <query>
  ╰──────────⳹`

let gamemenu = `
  ✦ ───『 *game* 』─── ⚝
  ◈ .slot <amount>
  ◈ .chess [from to]
  ◈ .chess delete
  ◈ .chess join
  ◈ .chess start
  ◈ .delttt
  ◈ .guessflag
  ◈ .Maths <modes>
  ◈ .ppt <rock/paper/scissors>
  ◈ .tictactoe <tag number>
  ╰──────────⳹`
let logomenu = `
  ✦ ───『 *maker* 』─── ⚝
  ◈ .blur
  ◈ .difuminar2
  ◈ .hornycard
  ◈ .hornylicense
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ◈ .simpcard
  ◈ .itssostupid
  ◈ .iss
  ◈ .stupid
  ◈ .tweet <comment>
  ◈ .lolicon
  ◈ .ytcomment <comment>
  ╰──────────⳹`

let stickermenu = `
  ✦ ───『 *sticker* 』─── ⚝
  ◈ .emojimix <emoji+emoji>
  ◈ .getsticker
  ◈ .smaker
  ◈ .stickerwithmeme (caption|reply media)
  ◈ .swmeme <url>
  ◈ .swm(caption|reply media)
  ◈ .sfull
  ◈ .toimg <sticker>
  ◈ .tovid
  ◈ .trigger <@user>
  ◈ .ttp
  ◈ .ttp2
  ◈ .ttp3
  ◈ .ttp4
  ◈ .ttp5
  ◈ .attp
  ◈ .attp2
  ◈ .attp3
  ◈ .take <name>|<author>
  ╰──────────⳹`

let audiomenu = `
  ✦ ───『 *audio* 』─── ⚝
  ◈ .bass [vn]
  ◈ .blown [vn]
  ◈ .deep [vn]
  ◈ .earrape [vn]
  ◈ .fast [vn]
  ◈ .fat [vn]
  ◈ .nightcore [vn]
  ◈ .reverse [vn]
  ◈ .robot [vn]
  ◈ .slow [vn]
  ◈ .smooth [vn]
  ◈ .tupai [vn]
  ╰──────────⳹`

let newsmenu = `
  ✦ ───『 *news* 』─── ⚝
  ◈ .news
  ◈ .technews
  ◈ .ndtv
  ╰──────────⳹
  `
let economy = `
  ✦ ───『 *economy* 』─── ⚝
  ◈ .addgold <@user>
  ◈ .addxp <@user>
  ◈ .bank
  ◈ .buych
  ◈ .cock-fight <amount>
  ◈ .buy
  ◈ .buyall
  ◈ .daily
  ◈ .deposit
  ◈ .gamble <amount> <color(red/black)>
  ◈ .give credit [amount] [@tag]
  ◈ .levelup
  ◈ .rank
  ◈ .rob
  ◈ .roulette <amount> <color(red/black)>
  ◈ .wallet
  ◈ .withdraw
  ◈ .work
  ╰──────────⳹`
let animemenu = `
  ✦ ───『 *anime* 』─── ⚝
  ◈ .anime
  ◈ .akira
  ◈ .akiyama
  ◈ .anna
  ◈ .asuna
  ◈ .ayuzawa
  ◈ .boruto
  ◈ .chiho
  ◈ .chitoge
  ◈ .deidara
  ◈ .erza
  ◈ .elaina
  ◈ .eba
  ◈ .emilia
  ◈ .hestia
  ◈ .hinata
  ◈ .inori
  ◈ .isuzu
  ◈ .itachi
  ◈ .itori
  ◈ .kaga
  ◈ .kagura
  ◈ .kaori
  ◈ .keneki
  ◈ .kotori
  ◈ .kurumi
  ◈ .madara
  ◈ .mikasa
  ◈ .miku
  ◈ .minato
  ◈ .naruto
  ◈ .nezuko
  ◈ .sagiri
  ◈ .sasuke
  ◈ .sakura
  ◈ .manhwa
  ◈ .waifu
  ◈ .neko
  ◈ .zerotwo
  ◈ .loli
  ◈ .pokedex <pokemon>
  ◈ .trace
  ╰──────────⳹
  `
let nsfwmenu = `
  ✦ ───『 *nsfw* 』─── ⚝
  ◈ .genshin
  ◈ .swimsuit
  ◈ .schoolswimsuit
  ◈ .white
  ◈ .barefoot
  ◈ .touhou
  ◈ .gamecg
  ◈ .hololive
  ◈ .uncensored
  ◈ .sunglasses
  ◈ .glasses
  ◈ .weapon
  ◈ .shirtlift
  ◈ .chain
  ◈ .fingering
  ◈ .flatchest
  ◈ .torncloth
  ◈ .bondage
  ◈ .demon
  ◈ .wet
  ◈ .pantypull
  ◈ .headdress
  ◈ .headphone
  ◈ .tie
  ◈ .anusview
  ◈ .shorts
  ◈ .stokings
  ◈ .topless
  ◈ .beach
  ◈ .bunnygirl
  ◈ .bunnyear
  ◈ .idol
  ◈ .vampire
  ◈ .gun
  ◈ .maid
  ◈ .bra
  ◈ .nobra
  ◈ .bikini
  ◈ .whitehair
  ◈ .blonde
  ◈ .pinkhair
  ◈ .bed
  ◈ .ponytail
  ◈ .nude
  ◈ .dress
  ◈ .underwear
  ◈ .foxgirl
  ◈ .uniform
  ◈ .skirt
  ◈ .sex
  ◈ .sex2
  ◈ .sex3
  ◈ .breast
  ◈ .twintail
  ◈ .spreadpussy
  ◈ .tears
  ◈ .seethrough
  ◈ .breasthold
  ◈ .drunk
  ◈ .fateseries
  ◈ .spreadlegs
  ◈ .openshirt
  ◈ .headband
  ◈ .food
  ◈ .close
  ◈ .tree
  ◈ .nipples
  ◈ .erectnipples
  ◈ .horns
  ◈ .greenhair
  ◈ .wolfgirl
  ◈ .catgirl
  ◈ .nsfw
  ◈ .ass
  ◈ .boobs
  ◈ .lesbian
  ◈ .pussy
  ◈ .pack
  ◈ .xvid
  ◈ .xnxx
  ╰──────────⳹`

let toolsmenu = `
  ✦ ───『 *tools* 』─── ⚝
  ◈ .nowa
  ◈ .qr <text>
  ◈ .qrcode <text>
  ◈ .style <key> <text>
  ◈ .weather *<place>*
  ◈ .dehaze
  ◈ .recolor
  ◈ .hdr
  ◈ .length <amount>
  ◈ .tinyurl <link>
  ◈ .shorten <link>
  ◈ .tempmail
  ◈ .shazam
  ◈ .cal <equation>
  ◈ .carbon <code>
  ◈ .define <word>
  ◈ .element
  ◈ .google
  ◈ .itunes
  ◈ .lyrics
  ◈ .imdb
  ◈ .course
  ◈ .randomcourse
  ◈ .readmore <text1>|<text2>
  ◈ .readvo
  ◈ .removebg
  ◈ .time
  ◈ .period @user
  ◈ .ss <url>
  ◈ .ssf <url>
  ◈ .subreddit
  ◈ .telesticker  Ⓛ
  ◈ .tourl
  ◈ .translate <lang> <text>
  ◈ .true
  ◈ .tts <lang> <task>
  ◈ .wa
  ◈ .wikipedia
  ╰──────────⳹`

let Aimenu = `
  ✦ ───『 *AI* 』─── ⚝
  ◈ .bing
  ◈ .dalle
  ◈ .chatgpt
  ◈ .toanime
  ◈ .gitagpt
  ◈ .tocartoon
  ◈ .ai
  ◈ .bard
  ◈ .alexa
  ◈ .bingimg
  ◈ .gemini
  ◈ .sona
  ╰──────────⳹
  `
let religionmenu = `
  ✦ ───『 *religion* 』─── ⚝
  ◈ .gita [verse_number]
  ◈ .quran [surah_number|surah_name]
  ╰──────────⳹`

let botmenu = `
  ✦ ───『 *Bot Menu* 』─── ⚝
  ◈ .ping
  ◈ .runtime
  ◈ .script
  ◈ .server
  ◈ .blocklist
  ◈ .alive
  ◈ .info
  ◈ .owner
  ◈ .totalfeature
  ◈ .list
  ◈ .messi
  ◈ .cristianoronaldo
  ◈ .cr7
  ◈ .ppcouple
  ◈ .ppcp
  ◈ .pinterest
  ◈ .reg <name.age>
  ◈ .mysn
  ◈ .unreg 
  ╰──────────⳹
  `
let pluginmenu = `
  ✦ ───『 *plugin* 』─── ⚝
  ◈ .plugins
  ◈ .install <Gist URL>
  ╰──────────⳹
  `

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  let glb = global.db.data.users
  let usrs = glb[m.sender]
  let tag = `@${m.sender.split('@')[0]}`
  let mode = global.opts['self'] ? 'Private' : 'Public'

  let { age, exp, limit, level, role, registered, credit } = glb[m.sender]
  let { min, xp, max } = xpRange(level, global.multiplier)
  let name = await conn.getName(m.sender)
  let premium = glb[m.sender].premiumTime
  let prems = `${premium > 0 ? 'Premium' : 'Free'}`
  let platform = os.platform()

  let ucpn = `${ucapan()}`

  let _uptime = process.uptime() * 1000
  let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime =
      (await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      })) * 1000
  }
  let muptime = clockString(_muptime)
  let uptime = clockString(_uptime)

  let totalfeatures = Object.values(global.plugins).filter(v => v.help && v.tags).length
  let totalreg = Object.keys(glb).length

  conn.gurumenu = conn.gurumenu ? conn.gurumenu : {}

  global.fcontact = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  const infoText = `
   > ${botname} あ⁩ 」\n
- Hii ${name} broo
    
- *${ucpn}* 
   
乂───『 *U S E R*』───乂
⛥ *Name:* ${name}
⛥ *Gold:* ${credit}
⛥ *Role:* ${role}
⛥ *Level:* ${level}
⛥ *Xp:* ${exp}
╰──────────⳹
   
乂───『 *I N F O*』───乂
⛥ *Bot Name:* ${botname}
⛥ *Mode:* ${mode}
⛥ *Platform:* ${platform}
⛥ *Type:* NodeJs
⛥ *Baileys:* ASUS ROG
⛥ *Prefix:* [ *${usedPrefix}* ]
⛥ *Uptime:* ${muptime}
⛥ *Database:*  ${totalreg}
╰──────────⳹
> © SAMRAT XD\n\n
${readMore}
乂───『 *I N F O  C M D*』───乂 
│ *${totalfeatures}* Commands
╰──────────⳹
     

乂───『 *INFO*』───乂 
│*Reply with the number*
│ to get respected Menu*
╰───────⳹
╭───────⳹
│ *1.* Bot Menu
│ *2.* Owner Menu
│ *3.* Group Menu
│ *4.* Fun Menu
│ *5.* Reaction Menu
│ *6.* Downloader Menu
│ *7.* Game Menu
│ *8.* Logo Menu
│ *9.* Sticker Menu
│ *10.* Audio Menu
│ *11.* News Menu
│ *12.* Economy Menu
│ *13.* Anime Menu
│ *14.* NSFW Menu
│ *15.* Tools Menu
│ *16.* AI Menu
│ *17.* Religion Menu
│ *18.* Plugin Menu
╰───────⳹
 `
  const { result, key, timeout } = await conn.sendMessage(
    m.chat,
    { video: { url: menuvid }, caption: infoText.trim(),
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363178281296360@newsletter',
        newsletterName: 'Samriddho',
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: 'SAMRAT XD',
        body: 'ᴍᴇɴᴜ',
        thumbnailUrl: 'https://i.pinimg.com/736x/67/4b/41/674b416d858ce262be0c53253b3f1dcc.jpg',
        sourceUrl: 'https://guruapi.tech',
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
    
    gifPlayback: true, gifAttribution: 0 },
    { quoted: fcontact }
  )

  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      })
      delete conn.gurumenu[m.sender]
    }, 150 * 1000),
  }
}

handler.before = async (m, { conn }) => {
  conn.gurumenu = conn.gurumenu ? conn.gurumenu : {}
  if (m.isBaileys || !(m.sender in conn.gurumenu)) return
  const { result, key, timeout } = conn.gurumenu[m.sender]
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  const choice = m.text.trim()

 if (choice === "1") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/HGSGFCD.jpg' },
      caption: botmenu
    }, { quoted:fcontact });
    } else if (choice === "2") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/WCgjmIR.jpg' },
      caption: ownermenu
    }, { quoted:fcontact });
    } else if (choice === "3") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/WCgjmIR.jpg' },
      caption: groupmenu
    }, { quoted:fcontact });
    } else if (choice === "4") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: funmenu
    }, { quoted:fcontact });
    } else if (choice === "5") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/kfIMF6Y.jpg' },
      caption: reactmenu
    }, { quoted:fcontact });
    } else if (choice === "6") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/sLs5Xhz.jpg' },
      caption: dlmenu
    }, { quoted:fcontact });
    } else if (choice === "7") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/WCgjmIR.jpg' },
      caption: groupmenu
    }, { quoted:fcontact });
    } else if (choice === "8") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/geErrMJ.jpg' },
      caption: logomenu
    }, { quoted:fcontact });
    } else if (choice === "9") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/geErrMJ.jpg' },
      caption: stickermenu
    }, { quoted:fcontact });
    } else if (choice === "10") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/sLs5Xhz.jpg' },
      caption: audiomenu
    }, { quoted:fcontact });
    } else if (choice === "11") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: newsmenu
    }, { quoted:fcontact });
    } else if (choice === "12") {
      await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
      caption: economy
    }, { quoted:fcontact });
    } else if (choice === "13") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: animemenu
    }, { quoted:fcontact });
    } else if (choice === "14") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: nsfwmenu
    }, { quoted:fcontact });
    } else if (choice === "15") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: toolsmenu
    }, { quoted:fcontact });
    } else if (choice === "16") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: Aimenu
    }, { quoted:fcontact });
    } else if (choice === "17") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/kfIMF6Y.jpg' },
      caption: religionmenu
    }, { quoted:fcontact });
    } else if (choice === "18") {
      await conn.sendMessage(m.chat, { image: { url: 'https://imgur.com/iyH60Su.jpg' },
      caption: pluginmenu
    }, { quoted:fcontact });
    } else {
      m.reply('Invalid choice. Please reply with a valid number.');
    }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(menu)$/i
handler.limit = true
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}

function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [
    ye,
    ' *Years 🗓️*\n',
    mo,
    ' *Month 🌙*\n',
    d,
    ' *Days ☀️*\n',
    h,
    ' *Hours 🕐*\n',
    m,
    ' *Minute ⏰*\n',
    s,
    ' *Second ⏱️*',
  ]
    .map(v => v.toString().padStart(2, 0))
    .join('')
}

function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  let res = 'Good morning ☀️'
  if (time >= 4) {
    res = 'Good Morning 🌄'
  }
  if (time >= 10) {
    res = 'Good Afternoon ☀️'
  }
  if (time >= 15) {
    res = 'Good Afternoon 🌇'
  }
  if (time >= 18) {
    res = 'Good Night 🌙'
  }
  return res
}

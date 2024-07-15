let toM = a => '@' + a.split('@')[0];

function getRandomPercentage() {
    // Generate a random percentage between 1 and 100
    return Math.floor(Math.random() * 110) + 1;
}

function handler(m, { groupMetadata }) {
    const mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
        let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
      let name = conn.getName(who)
        let ps = groupMetadata.participants.map(v => v.id);
    let a = m.sender;
    let b;
    do {
        b = ps[Math.floor(Math.random() * ps.length)]; // Select a random participant
    } while (b === a);

    let c;
    do {
        c = ps[Math.floor(Math.random() * ps.length)]; // Select another random participant
    } while (mentionedUser === b); // Ensure it's different from both a and b

    const percentage = getRandomPercentage();

    let message;
    if (percentage < 25) {
        message = `হাল ছেড়ো না বন্ধু একদিন পটবেই 🙃.`;
    } else if (percentage < 50) {
        message = `দুজনকে ভালো মানাবে কিন্তু😁.`;
    } else if (percentage < 75) {
        message = `বিয়ের সানাই বাজার অপেক্ষা 😗😆`;
    } else if (percentage < 90) {
        message = `তোমরা তো সাক্ষাৎ শিব-পার্বতী 🙏🏻`;
    } else if (percentage < 100) {
        message = `রূপশ্রীর পঁচিশ হাজার টাকা ঢুকে গেল... 🙆🏻🎶🎵`;
    } else if (percentage < 110) {
        message = `কাল দুজনে নবান্নে দেখা করিস, পিসি নিজে মন্তর পড়ে বিয়ে দেবে 🫂`;
    } else {
        message = `Congratulations, your ${percentage}% 💖🍻`;
    }

    m.reply(`⚔ꜱᴀᴍʀᴀᴛ xᴅ ʙᴏᴛ ᴡɪꜰᴇ ᴘʀᴇᴅɪᴄᴛᴏʀ⚔   

    ✯───────────✯───────────✯
    
    @${mentionedUser.split("@")[0]} ❤ \n
      Your New Wife is   *👉 ${toM(b)} 👈* 
    
    ✯───────────✯───────────✯

> ʏᴏᴜʀ ʀᴇʟᴀᴛɪᴏɴsʜɪᴘ ᴘʀᴏʙᴀʙɪʟɪᴛʏ: ${percentage}%
> ᴘʀᴇᴅɪᴄᴛɪᴏɴ : *${message}*`, null, {
        mentions: [mentionedUser, b, c]
    });
}

handler.help = ['couple'];
handler.tags = ['fun'];
handler.command = ['wife'];
handler.group = true;

export default handler;

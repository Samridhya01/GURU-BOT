let toM = a => '@' + a.split('@')[0];

function getRandomPercentage() {
    // Generate a random percentage between 1 and 100
    return Math.floor(Math.random() * 120) + 1;
}

function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id);
    let a = m.sender;
    let b;
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
    do {
        b = ps[Math.floor(Math.random() * ps.length)]; // Select a random participant
    } while (b === a);

    const percentage = getRandomPercentage();

    m.reply(`${name} have ${percentage} child, father/mother is ${toM(b)} 😎`, null, {
        mentions: [b]
    });
}

handler.help = ['Child @user'];
handler.tags = ['fun'];
handler.command = ['child'];
handler.group = true;

export default handler;

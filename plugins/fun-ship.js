let toM = a => '@' + a.split('@')[0];

function getRandomPercentage() {
    // Generate a random percentage between 1 and 100
    return Math.floor(Math.random() * 120) + 1;
}

function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id);
    let a = m.sender;
    let b;
    do {
        b = ps[Math.floor(Math.random() * ps.length)]; // Select a random participant
    } while (b === a);

    const percentage = getRandomPercentage();

    m.reply(`${toM(a)} ❤️ ${toM(b)}\nCongratulations, your ${percentage}% 💖🍻`, null, {
        mentions: [a, b]
    });
}

handler.help = ['ship'];
handler.tags = ['fun'];
handler.command = ['ship'];
handler.group = true;

export default handler;

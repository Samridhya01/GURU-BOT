let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let av = `./Assets/mp3/${pickRandom(["Bot", "Bot1", "Bot2", "Bot3", "Bot4", "Bot5", "bot6", "Bot7", "Bot8", "Bot9", "Bot10", "Bot11", "Bot12", "Bot13", "Bot14", "Bot15", "Babu", "Bot16", "Bot17", "Bot18", "Bot19", "Bot20", "Bot21", "Bot22", "Bot23", "Bot24", "Bot25"])}.mp3`;
    m.react(pickRandom(["🐸", "🐼", "🐨", "🐭", "🐹", "🐰", "🐻", "🐻‍❄️", "🫎", "🐴", "🐈", "🐈‍⬛", "🐅", "🐆", "🐎", "🦌", "🐄", "🐫", "🦙", "🦥", "🦨", "🦡", "🐘", "🦣", "🐁", "🐀", "🦔", "🐇", "🐊", "🦎", "🦫", "🦕", "🐉", "🦭", "🐟", "🐡", "🦞", "🦑", "🦐", "🦆", "🪼", "🦢", "🦜", "🐦‍⬛", "🪿", "🪶", "🐣", "🐤", "🐧", "🦩", "🦚", "🪳", "🐜", "🪲", "🦂", "❤️‍🔥", "😻"]));

    m.reply(`Hello ${taguser} Nice To meet you ❤️`);
    conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
}

handler.customPrefix = /^(samrat|samridhya|saraswati|Priya)$/i;
handler.command = new RegExp;

export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

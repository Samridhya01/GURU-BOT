let toM = a => {
    if (!a) return ""; // Defensive programming: return empty string if `a` is undefined
    return '@' + a.split('@')[0];
};

async function handler(m, { conn, groupMetadata }) {
  const mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    let ps = groupMetadata.participants.map(v => v.id);
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe() ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let a = m.sender;
    if (!a) return; // Defensive programming: exit function if `a` is undefined

    let b, c, d, e, f; // Declare additional variables

    // Select random participants until it's not the same as a
    do {
        b = ps[Math.floor(Math.random() * ps.length)];
    } while (b === a);

    // Select additional random participants until they are not the same as a or each other
    do {
        c = ps[Math.floor(Math.random() * ps.length)];
    } while (c === a || c === b);

    do {
        d = ps[Math.floor(Math.random() * ps.length)];
    } while (d === a || d === b || d === c);

    // Assign values to e and f
    e = ps[Math.floor(Math.random() * ps.length)];
    f = ps[Math.floor(Math.random() * ps.length)];

    const percentage = getRandomPercentage();

    conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/simpcard', {
        avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://imgur.com/Uzmskkn.jpg'),
    }), 'error.png', `গোপন সূত্র থেকে পাওয়া @${mentionedUser.split("@")[0]} চৌদ্দগুষ্টির বিবরণ:
    বাবা: lord Samridhya 👨
    মা/2nd বাবা:‌- ${toM(b)}🫃
    ভাই/বোন:- ${toM(c)}💆
    বর/বউ:- ${toM(a)}👫
    Bf/Gf:- ${toM(a)} 👩‍❤‍💋‍👨
    Ex:- ${toM(d)} 🤡
    বাড়িওয়ালা- ${toM(e)} 🏟
    শশুর/শাশুরি:- ${toM(f)} 🧚
    Total Childs: ${percentage}
    ${name} এই হল তোমার আসল পরিচয় কাল সবাইকে নিয়ে নবান্ন দেখা কর।🤸‍♂`, null, {
        mentions: [a, b, c, d, e, f, mentionedUser] // Include all variables in mentions
    }, m);
}

function getRandomPercentage() {
    // Generate a random percentage between 1 and 100
    return Math.floor(Math.random() * 12) + 1;
}

handler.help = ['family2 @user'];
handler.tags = ['fun'];
handler.command = ['family2'];
handler.group = true;

export default handler;

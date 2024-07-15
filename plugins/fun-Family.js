let toM = a => {
    if (!a) return ""; // Defensive programming: return empty string if `a` is undefined
    return '@' + a.split('@')[0];
};

function getRandomPercentage() {
    // Generate a random percentage between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
}

function handler(m, { groupMetadata }) {
  const mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
    let ps = groupMetadata.participants.map(v => v.id);
    let a = m.sender;
    if (!a) return; // Defensive programming: exit function if `a` is undefined
    
    let b, c, d, e, f, g; // Declare additional variables
    
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
    
    // Assign values to e, f, and g
    e = ps[Math.floor(Math.random() * ps.length)];
    f = ps[Math.floor(Math.random() * ps.length)];
    g = ps[Math.floor(Math.random() * ps.length)];
    
    const percentage = getRandomPercentage();

    m.reply(`গোপন সূত্র থেকে পাওয়া @${mentionedUser.split("@")[0]} চৌদ্দগুষ্টির বিবরণ:\n
বাবা: lord Samrat 👨\n
মা/2nd বাবা:‌- ${toM(b)}🫃\n
ভাই/বোন:- ${toM(c)}💆\n
বর/বউ:- ${toM(a)}👫\n
Bf/Gf:- ${toM(a)} 👩‍❤‍💋‍👨\n
ক্রাশ :- ${toM(g)} 
Ex:- ${toM(d)} 🤡\n
বাড়িওয়ালা- ${toM(e)} 🏟\n
শশুর/শাশুরি:- ${toM(f)} 🧚\n
Total বাচ্চা: ${percentage}\n
${name} এই হল তোমার আসল পরিচয় কাল সবাইকে নিয়ে নবান্ন দেখা কর।🤸‍♂`, null, {
        mentions: [a, b, c, d, e, f, mentionedUser] // Include all variables in mentions
    });
}

handler.help = ['family @user'];
handler.tags = ['fun'];
handler.command = ['family'];
handler.group = true;

export default handler;

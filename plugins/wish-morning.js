let handler = async (m, { conn }) => {
    let av = `./Assets/mp3/ringtone-5166.mp3`;
    m.react('☀️');

    m.reply(`${pickRandom(["Good morning, my dear friend! May your day be as amazing as you are",
                          "You got this! Rise and Shine!",
                          "You are a force of nature. I hope you know that",
                          "Good morning, sunshine! I hope your day is filled with laughter and love",
                          "I hope your day is as sweet as your smile",
                          "Your energy is unmatched, your smile lights up a room",
                          "You're the reason I start my day off with a smile",
                          "My days are brighter and happier with you around",
                          "I used to need coffee in the morning, but now I have the excitement of seeing you later to get me out of bed!"])}`);

    conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
};

handler.customPrefix = /^(morning|good morning)$/i;
handler.command = new RegExp;

export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

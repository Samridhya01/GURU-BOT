  let handler = async (m, { conn }) => {
      m.react('🐸');
m.reply(`${pickRandom(["bolo","ki korcho","bolo sona"])}`);
  };

  handler.customPrefix = /^(hi|hii|hay|hlw|Hello)$/i;
  handler.command = new RegExp;

  export default handler;

  function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())];
  }

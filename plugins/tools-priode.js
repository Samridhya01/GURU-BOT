let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let now = new Date();
  let nextPeriodDate = new Date(now.getTime() + (28 * 24 * 60 * 60 * 1000)); // Adding 28 days to the current date
  let result = nextPeriodDate.toDateString();
  m.reply(`Your next period date is ${result}`);
}

handler.help = ['period'];
handler.tags = ['tools'];
handler.command = ['period'];
handler.group = false;

export default handler;

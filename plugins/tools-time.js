let handler = async (m, { conn, usedPrefix, command }) => {
  // Get the current date and time in Kolkata timezone
  let now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  let date = new Date(now).toDateString(); // Convert date to a string
  let time = new Date(now).toLocaleTimeString(); // Get time in local format

  // Send the current date and time in Kolkata in the reply
  m.reply(`┏━━⏰ _Today's Sauce!_ ⏰━┓
┃ 📆  *Today's Date:* ${date} 
┃ ⏲️  *Current Time (Kolkata):* ${time} 
┗━━━━━━━━━━━━━┛`);
}

handler.help = ['time'];
handler.tags = ['tools'];
handler.command = ['time'];
handler.group = false;

export default handler;

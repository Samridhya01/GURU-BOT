let handler = async (m, { conn }) => {
  try {
    // List of progress messages
    const progressMessages = [
      '8✊======>',
      '8=✊=====>',
      '8==✊====>',
      '8===✊===>',
      '8====✊==>',
      '8=====✊=>',
      '8======✊>',
      '8=====✊=>',
      '8====✊==>',
      '8===✊===>',
      '8==✊====>',
      '8=✊=====>',
      '8✊======> 💦',
      '8✊=====> 💦',
      '8✊======> 💦 💦',
      '8✊=====> 💦 💦',
      '8✊======> 💦 💦 💦'
    ];

    // Send initial message
    let pingMsg = await conn.sendMessage(m.chat, { text: progressMessages[0] });

    // Loop to update the message with new progress messages
    for (let i = 1; i < progressMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay of 1 second between changes
      await conn.sendMessage(m.chat, {
        text: progressMessages[i],
        edit: pingMsg.key,
      }8;
    }
  } catch (error) {
    // Error handling
    console.error(error);
    await conn.sendMessage(m.chat, { text: 'An error occurred!' });
  }
}

handler.help = ['edit'];
handler.tags = ['edit'];
handler.command = ['mutti'];

export default handler;

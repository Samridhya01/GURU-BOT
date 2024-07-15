let handler = async (m, { conn }) => {
  try {
    // List of progress messages
    const progressMessages = [
      " █ 10%",
      " █ █ 20%",
      " █ █ █ 30%",
      " █ █ █ █ 40%",
      " █ █ █ █ █ 50%",
      " █ █ █ █ █ █ 60%",
      " █ █ █ █ █ █ █ 70%",
      " █ █ █ █ █ █ █ █ 80%",
      " █ █ █ █ █ █ █ █ █ 90%",
      " █ █ █ █ █ █ █ █ █ █ 100%",
      "System hijacking in process..\nConnecting to Server error 404",
      "Device successfully connected...\nReceiving data...",
      "Data hijacked from device 100% completed\nKilling all evidence, removing all malwares...",
      "HACKING COMPLETED",
      "SENDING LOG DOCUMENTS...",
      "SUCCESSFULLY SENT DATA AND Connection disconnected"
    ];
    
    // Send initial message
    let pingMsg = await conn.sendMessage(m.chat, { text: progressMessages[0] });

    // Loop to update the message with new progress messages
    for (let i = 1; i < progressMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay of 1 second between changes
      await conn.sendMessage(m.chat, {
        text: progressMessages[i],
        edit: pingMsg.key,
      });
    }
  } catch (error) {
    // Error handling
    console.error(error);
    await conn.sendMessage(m.chat, { text: 'An error occurred!' });
  }
}

handler.help = ['edit'];
handler.tags = ['edit'];
handler.command = ['hack'];

export default handler;

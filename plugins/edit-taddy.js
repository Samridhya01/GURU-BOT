let handler = async (m, { conn }) => {
  try {
    // List of heart emojis with different colors
    const heartEmojis = [
      '❤️',
      '🩷',
      '🧡',
      '💛',
      '💚',
      '💙',
      '🤍',
      '🩶',
      '🤎',
      '🖤',
      '💜',
      '🩵',
      '💟',
      '💘',
      '💖',
      '💗',
      '💓',
      '💞',
      '💕',
      '❣️',
      '❤️‍🔥',
      '❤️‍🩹',
      '💔',
    ]
    const iterations = 25

    // Send initial message with the first heart emoji
    let pingMsg = await conn.sendMessage(m.chat, { text: `(\\_/)\n( •.•)\n/>${heartEmojis[0]}` })

    // Loop to change the heart emoji 25 times
    for (let i = 1; i < iterations; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Add delay of 1 second between changes
      await conn.sendMessage(m.chat, {
        text: `(\\_/)\n( •.•)\n/>${heartEmojis[i % heartEmojis.length]}`,
        edit: pingMsg.key,
      })
    }

    // Send final "welcome" message after the loop
    await conn.sendMessage(m.chat, { text: 'Love You 💝' })
  } catch (error) {
    // Error handling
    console.error(error)
    await conn.sendMessage(m.chat, { text: 'An error occurred!' })
  }
}

handler.help = ['edit']
handler.tags = ['edit']
handler.command = ['taddy']

export default handler

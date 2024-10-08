            let handler = async (m, { conn }) => {
                let av = `./Assets/mp3/GoodNight.mp3`;
                m.react('🌃');

                m.reply(`${pickRandom(["Sweet dreams, beautiful",
                    "Sleep well, my dear",
                    "Goodnight, my love",
                    "Have a peaceful night",
                    "Dream of me tonight",
                    "Rest well, my angel",
                    "See you in my dreams",
                    "I hope you sleep well and have dreams as beautiful as you are",
                    "I love you more every night",
                    "I hope all your sweet dreams come true",
                    "Let the stillness of the night bring you calm and renewal",
                    "Wishing you a night of gentle rest",
                    "May your sleep be as comforting and peaceful as the love we share"])}`);

                conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
            };

            handler.customPrefix = /^(night|good night)$/i;
            handler.command = new RegExp;

            export default handler;

            function pickRandom(list) {
                return list[Math.floor(list.length * Math.random())];
            }

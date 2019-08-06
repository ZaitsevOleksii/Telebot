const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const request = require('request');


const token = config.get('token');
	
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/start/, (msg, match) => {

    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Оберіть відділення', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Eкономіки та комп"ютерних технологій',
                        callback_data: 'Eko'
                    }
                ],
                [
                    {
                        text: 'Правознавства та землевпорядкування',
                        callback_data: 'Prz'
                    }
                ],
                [
                    {
                        text: 'Механізації та енергетики',
                        callback_data: 'Meh'
                    }
                ]
            ]
        }
    });

    bot.on('callback_query', query => {

        

        if (query.data === 'Eko') {
            bot.sendMessage(chatId, 'Оберіть групу', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'IC9117',
                                callback_data: 'IC9117'
                            },
                            {
                                text: 'EL9117',
                                callback_data: 'EL9117'
                            },
                            {
                                text: 'OB9117',
                                callback_data: 'OB9117'
                            },
                            {
                                text: 'PZ9117',
                                callback_data: 'PZ9117'
                            }
                        ]
                    ]
                }
            });
        };

        if (query.data === 'Prz') {
            bot.sendMessage(chatId, 'Оберіть групу', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'IC9117',
                                callback_data: 'IC9117'
                            },
                            {
                                text: 'EL9117',
                                callback_data: 'EL9117'
                            },
                            {
                                text: 'OB9117',
                                callback_data: 'OB9117'
                            },
                            {
                                text: 'PZ9117',
                                callback_data: 'PZ9117'
                            }
                        ]
                    ]
                }
            });
        };

        if (query.data === 'Meh') {
            bot.sendMessage(chatId, 'Оберіть групу', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'IC9117',
                                callback_data: 'IC9117'
                            },
                            {
                                text: 'EL9117',
                                callback_data: 'EL9117'
                            },
                            {
                                text: 'OB9117',
                                callback_data: 'OB9117'
                            },
                            {
                                text: 'PZ9117',
                                callback_data: 'PZ9117'
                            }
                        ]
                    ]
                }
            });
        };

        bot.on('callback_query', query => {
            const id = query.message.chat.id;

            request('https://raw.githubusercontent.com/ZaitsevOleksii/mongo_express/master/rozkladfull.json', function (error, response, body) {
                const data = JSON.parse(body);
               
                const result = data.filter(item => item.ccy === query.data)[0];

                for (let i = 0; i < 5; i++) {
                    let md = `
              *${result.ccy}*
              *${result.list[i].name}*
              1: _${result.list[i].lesson[0]}_
              2: _${result.list[i].lesson[1]}_
              3: _${result.list[i].lesson[2]}_
              4: _${result.list[i].lesson[3]}_
            `;
                    bot.sendMessage(id, md, { parse_mode: 'Markdown' });
                }



            })
        })

    })

});

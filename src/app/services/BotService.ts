import { BadRequestError } from '../../helpers/ApiError';

class BotService {
    public validate(botMessage: number[]) {
        if(botMessage.length === 0) {
            return {
                options: [{
                    id: 1,
                    message: 'Digite 1 para conhecer nossos produtos',
                },{
                    id: 2,
                    message: 'Digite qualquer tecla para encerrar nossa conversa'
                }],
                message: 'Olá eu sou o bot da faap coverage'
            };
        }

        else if(JSON.stringify(botMessage) === JSON.stringify([1])) {
            return {
                options: [{
                    id: 1,
                    message: 'Digite 1 para conhecer o seguro automotivo',
                }, {
                    id: 2,
                    message: 'Digite 2 para conhecer o seguro casa',
                },
                {
                    id: 2,
                    message: 'Digite qualquer tecla para encerrar nossa conversa'
                }],
                message: 'Escolha um produto'
            };
        }

        else if(botMessage[0] === 1) {
            const option = botMessage[1];
            if(option === 1) {
                return {
                    message: 'Seguro Automotivo',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 2) {
                return {
                    message: 'Seguro Casa',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }
        }

        else {
            return {
                message: 'Tchau :)'
            };
        }

        throw new BadRequestError('');
    }
}

export default new BotService();

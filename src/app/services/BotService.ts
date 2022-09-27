class BotService {
    public validate(botMessage: number[]) {
        if(botMessage.length === 0) {
            return {
                options: [{
                    id: 1,
                    message: 'Digite 1 para mandar um formulário',
                }, {
                    id: 2,
                    message: 'Digite 2 para conhecer nossos produtos'
                }],
                message: 'Olá eu sou o bot da faap coverage'
            };
        }
        return {
            options: [{
                id: 1,
                message: 'Digite 5 para mandar um formulário',
            }, {
                id: 2,
                message: 'Digite 1 para conhecer nossos produtos'
            }],
            message: 'Olá eu sou o bot da faap coverage'
        }
    }
}

export default new BotService();

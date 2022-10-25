import { ValidationError, validate } from 'class-validator';
import { BadRequestError } from '../../helpers/ApiError';

import customerRepository from '../../repositories/customerRepository';
import errorsMessage from '../../utils/validateErrors';

class BotService {
    public async validate(botMessage: any[]) {
        if(botMessage.length === 0) {
            return {
                options: [
                    {
                        id: 1,
                        message: 'Digite 1 para conhecer nossos produtos',
                    },
                    {
                        id: 2,
                        message: 'Digite 2 para enviar uma mensagem para nossos atendentes'
                    },
                    {
                        id: 3,
                        message: 'Digite qualquer tecla para encerrar nossa conversa'
                    }
                ],
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

        else if(botMessage[0] === 2) {
            if(botMessage.length === 1) {
                return {
                    message: 'Digite o nome para ser enviado',
                    options: []
                };
            }

            if(botMessage.length === 2) {
                return {
                    message: 'Digite o email para ser enviado',
                    options: []
                };
            }

            if(botMessage.length === 3) {
                return {
                    message: 'Digite o Assunto para ser enviado',
                    options: []
                };
            }

            if(botMessage.length === 4) {
                return {
                    message: 'Digite a mensagem para ser enviada',
                    options: []
                };
            }

            if(botMessage.length === 5) {
                const customer = customerRepository.create({
                    name: botMessage[1],
                    email: botMessage[2],
                    subject: botMessage[3],
                    message: botMessage[4]
                });

                const errors: ValidationError[] = await validate(customer);

                if(errors.length > 0) {
                    throw new BadRequestError(errorsMessage(errors));
                }

                const customerCreated = await customerRepository.save(customer);

                if(customerCreated) {
                    return {
                        message: 'Mensagem enviada com sucesso',
                        options: [{
                            id: 0,
                            message: 'Tchau :)'
                        }]
                    };
                }

                return {
                    message: 'Falha ao enviar mensagem :(',
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

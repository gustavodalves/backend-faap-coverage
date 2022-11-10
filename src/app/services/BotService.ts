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
                        message: 'Digite 2 para enviar uma mensagem'
                    },
                    {
                        id: 3,
                        message: 'Digite 3 para consultar as perguntas mais frequentes'
                    },
                    {
                        id: 4,
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
                    id: 3,
                    message: 'Digite 3 para conhecer o seguro saúde pet'
                },
                {
                    id: 4,
                    message: 'Digite 4 para conhecer o seguro viagem'
                },
                {
                    id: 5,
                    message: 'Digite 5 para conhecer o seguro transporte'
                },
                {
                    id: 6,
                    message: 'Digite 6 para conhecer o seguro celular'
                },
                {
                    id: 7,
                    message: 'Digite 7 para conhecer o seguro empresa'
                },
                {
                    id: 8,
                    message: 'Digite 8 para conhecer o seguro saúde'
                },
                {
                    id: 9,
                    message: 'Digite 9 para conhecer o seguro fiança'
                },
                {
                    id: 3,
                    message: 'Digite qualquer tecla para encerrar nossa conversa'
                }],
                message: 'Escolha um produto'
            };
        }

        else if(botMessage[0] === 1) {
            const option = botMessage[1];
            if(option === 1) {
                return {
                    message: 'Tranquilidade no seu dia e nas viagens. A certeza de que o inesperado não irá te perturbar. Com várias opções de coberturas como colisão, incêndio, roubo, furto, terceiros, além de assistência 24h. Nós da FAAP, faremos sua cotação procurando atender suas necessidades e o melhor custo benefício.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 2) {
                return {
                    message: 'A garantia de que a sua família e o seu patrimônio estarão em segurança é o nosso objetivo. Opções de seguros para sua residência com coberturas para danos elétricos, incêndio, explosão, fumaça, roubo, responsabilidade civil e outros, conforme a sua necessidade.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 3) {
                return {
                    message: 'Saúde, vacinas e qualidade de vida para o seu pet que merece tanto carinho, cuidado e protegendo o dono dos imprevistos. Sim, temos o melhor para oferecer, consulte-nos.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 4) {
                return {
                    message: 'Viagem de férias, a trabalho, malas prontas, destino dos sonhos! Porque longe de casa temos que estar mais seguros do que nunca. Garanta os imprevistos e fique tranquilo, estaremos aqui para dar todo o suporte.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 5) {
                return {
                    message: 'A garantia que seus produtos, durante transporte, estarão seguros são os nossos objetivos nesse caso. Transporte de carga, sem risco de perder algum valor, como extravio, são tais possibilidades a se evitar ao escolher essa opção.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 6) {
                return {
                    message: 'Atualmente os smartphones, notebooks, câmeras, instrumentos musicais e outros equipamentos eletrônicos são indispensáveis no nosso dia a dia, mas o risco existe e podemos minimizar. Consulte-nos, você escolhe as coberturas conforme sua necessidade.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 7) {
                return {
                    message: 'Proteção e Segurança para sua empresa como escritórios, lojas, comércios em geral e indústrias e seus clientes.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 8) {
                return {
                    message: 'Segurança, tranquilidade e proteção para você, sua família e seus funcionários. Planos individuais, por adesão ou para a sua empresa à partir de duas vidas. Administramos procurando trazer apoio e o seu melhor custo-benefício.',
                    options: [{
                        id: 0,
                        message: 'Tchau :)'
                    }]
                };
            }

            else if(option === 9) {
                return {
                    message: 'Com a FAPP Seguros, o seguro fiança para alugar um imóvel ficou muito mais fácil. Você não precisa se preocupar com fiador e caução; aluga o imóvel que quiser, para sua moradia ou seu negócio, com agilidade. Fazemos toda a consultoria com garantia.',
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
                    message: botMessage[4],
                    product: '',
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

        else if(botMessage[0] === 3) {
            if(botMessage.length === 1) {
                return {
                    message: 'Perguntas mais feitas',
                    options: [
                        {
                            id: 1,
                            message: 'Digite 1 para saber sobre os preços dos principais seguros',
                        },
                        {
                            id: 2,
                            message: 'Digite 2 para saber os planos dos nossos principais seguros',
                        },

                    ]
                };
            }
            else if(botMessage.length === 2) {
                return {
                    message: 'Seguro:',
                    options: [{
                        id: 1,
                        message: 'Digite 1 para saber sobre Seguro de carro',
                    },
                    {
                        id: 2,
                        message: 'Digite 2 para saber sobre Seguro de vida',
                    },]
                };
            }
            else if(botMessage[1] === 1) {
                if(botMessage[2] === 1) {
                    return {
                        message: 'Precos:',
                        options: [{
                            id: 1,
                            message: 'Seguro simples: R$ 100,00 / mês',
                        },
                        {
                            id: 2,
                            message: 'Seguro médio: R$ 200,00 / mês',
                        },
                        {
                            id: 3,
                            message: 'Seguro avançado: R$ 300,00 / mês',
                        },
                        {
                            id: 0,
                            message: 'Tchau :)'
                        }]
                    };
                } else if(botMessage[2] === 2) {
                    return {
                        message: 'Planos:',
                        options: [{
                            id: 1,
                            message: 'Seguro simples: cobre batida de carro com um sinistro de R$ 2.000,00',
                        },
                        {
                            id: 2,
                            message: 'Seguro médio: cobre batida de carro e roubo com um sinistro de R$ 1.000,00',
                        },
                        {
                            id: 3,
                            message: 'Seguro médio: cobre batida de carro e roubo com um sinistro de R$ 100,00',
                        }, {
                            id: 0,
                            message: 'Tchau :)'
                        }]
                    };
                }
            } else if(botMessage[1] === 2) {

                if(botMessage[2] === 1) {
                    return {
                        message: 'Precos:',
                        options: [{
                            id: 1,
                            message: 'Seguro simples: R$ 100,00 / mês',
                        },
                        {
                            id: 2,
                            message: 'Seguro médio: R$ 200,00 / mês',
                        },
                        {
                            id: 3,
                            message: 'Seguro avançado: R$ 300,00 / mês',
                        }, {
                            id: 0,
                            message: 'Tchau :)'
                        }]
                    };
                }

                if(botMessage[2] === 2) {
                    return {
                        message: 'Precos:',
                        options: [{
                            id: 1,
                            message: 'Seguro simples: 300% do valor arrecadado',
                        },
                        {
                            id: 2,
                            message: 'Seguro médio: 700% do valor arrecadado',
                        },
                        {
                            id: 3,
                            message: 'Seguro avançado: 1200% do valor arrecadado',
                        }, {
                            id: 0,
                            message: 'Tchau :)'
                        }]
                    };
                }

            }

        }
        else {
            return {
                message: 'Tchau :)'
            };
        }

        return {
            message: 'Tchau :)'
        };

        throw new BadRequestError('');
    }
}

export default new BotService();

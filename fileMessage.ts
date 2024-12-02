import {promises as fs} from 'fs';
import path from 'path';
import {IMessage} from './types';

const messagesDirectory = path.resolve(__dirname, 'messages');
let messages: IMessage[] = [];

const fileMessages = {

    async addMessage(message: IMessage) {
        const fileName = `${message.datetime}.txt`;
        const fileWay = path.resolve(messagesDirectory, fileName);

        try {
            await fs.writeFile(fileWay, JSON.stringify(message));
            messages.push(message);
            return message;
        } catch (error) {
            console.error(error);
        }
    },

};

export default fileMessages;

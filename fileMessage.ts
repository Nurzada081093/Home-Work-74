import {promises as fs} from 'fs';
import path from 'path';
import {IMessage} from './types';

const messagesDirectory = path.resolve(__dirname, 'messages');
let messages: IMessage[] = [];

const fileMessages = {
    async createDirectory() {
        try {
            await fs.access(messagesDirectory);
        } catch (err) {
            await fs.mkdir(messagesDirectory, { recursive: true });
        }
    },

    async addMessage(message: IMessage) {
        await this.createDirectory();
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

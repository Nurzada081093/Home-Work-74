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

    async getMessages() {
        return messages;
    },

    async addMessage(message: IMessage) {
        await this.createDirectory();
        messages.push(message);

        if (messages.length > 5) {
            const messageDateSort = messages.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
            messages = messageDateSort.slice(0, 5);
        }

        const fileName = `${message.datetime}.txt`;
        const fileWay = path.resolve(messagesDirectory, fileName);

        try {
            await fs.writeFile(fileWay, JSON.stringify(message));
            const files = await fs.readdir(messagesDirectory);

            for (const file of files) {
                await fs.unlink(path.resolve(messagesDirectory, file));
            }

            messages.forEach((message) => {
                const fileName = `${message.datetime}.txt`;
                const filePath = path.resolve(messagesDirectory, fileName);
                fs.writeFile(filePath, JSON.stringify(message));
            });

            return message;

        } catch (error) {
            console.error(error);
        }
    },

};

export default fileMessages;

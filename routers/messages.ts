import express from 'express';
import {IMessage} from '../types';
import fileMessage from '../fileMessage';

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const messages = await fileMessage.getMessages();
    res.send(messages);
});

messagesRouter.post("/", async (req, res) => {
    const datetime = new Date().toISOString();
    const newMessage: IMessage = {
        message: req.body.message,
        datetime,
    };

    const sendMessage = await fileMessage.addMessage(newMessage);
    res.send(sendMessage);
});

export default messagesRouter;
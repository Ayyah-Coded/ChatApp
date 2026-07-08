import { conversationRouter } from '../routes/conversation.route.js';
export const registerRoutes = (app) => {
    // Health check endpoint for Docker/K8s
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', service: 'chat-service' });
    });
    app.use('/conversations', conversationRouter);
};
//# sourceMappingURL=index.js.map
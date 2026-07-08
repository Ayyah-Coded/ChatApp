import { HttpError, USER_ID_HEADER, z } from 'common';
const userIdSchema = z.string().uuid();
export const attachAuthenticatedUser = (req, _res, next) => {
    try {
        const headerValue = req.header(USER_ID_HEADER);
        const userId = userIdSchema.parse(headerValue);
        req.user = { id: userId };
        next();
    }
    catch {
        next(new HttpError(401, 'Invalid or missing user context'));
    }
};
//# sourceMappingURL=authenticated-user.js.map
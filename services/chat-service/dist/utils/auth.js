import { HttpError } from 'common';
export const getAuthenticatedUser = (req) => {
    if (!req.user) {
        throw new HttpError(401, 'Unauthorized');
    }
    return req.user;
};
//# sourceMappingURL=auth.js.map
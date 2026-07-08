import type { UserCreatedPayload } from 'common';
interface UserDocument {
    _id: string;
    email: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
}
export declare const userRepository: {
    upsertUser(payload: UserCreatedPayload): Promise<void>;
    findUserById(id: string): Promise<UserDocument | null>;
};
export {};
//# sourceMappingURL=user.repository.d.ts.map
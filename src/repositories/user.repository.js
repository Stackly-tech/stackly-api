export class UserRepository {
    async create(data) {
        return {
            id: 1,
            ...data
        };
    }
}
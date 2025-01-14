import { faker } from '@faker-js/faker';

export class UserData {
    static generateRandomUser() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName().replace(/[-']/g, '');
        const email = `aqa.${firstName}.${lastName}@mail.co`.toLowerCase();
        const password = 'Sj4v_f8#';

        return {
            firstName,
            lastName,
            email,
            password,
        };
    }
}
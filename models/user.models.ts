interface User {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
    production_step: 'PREPRODUCTION' | 'COOKING' | 'STORAGE' | 'PACKAGING';
}

interface User {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
    production_step: 'Pre-Production' | 'Cooking' | 'Storage' | 'Packaging';
}

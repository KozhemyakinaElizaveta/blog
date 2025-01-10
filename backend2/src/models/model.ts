export interface User {
    id: number;
    password: string;
    username: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}  

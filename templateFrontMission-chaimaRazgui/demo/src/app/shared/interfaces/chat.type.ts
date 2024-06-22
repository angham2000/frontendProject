export interface Chat {
    idUser: number;
    email: string;
    userName: string;
    password: string;
    role: string;
    enabled: boolean;
    avatar?: string;
    msg?: Msg[];
}

export interface Msg {
    avatar: string;
    text: string;
    from: string;
    time: string;
    msgType: 'text' | 'date' | 'image' | 'file';
}

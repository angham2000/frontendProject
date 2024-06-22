import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../interfaces/chat.type';
import { User } from '../Models/user.model';
import { Files } from '../interfaces/file-manager.type';
import { Mail } from '../interfaces/mail.type';
import { ProjectList } from '../interfaces/project-list.type';
import { Message } from 'stompjs';

@Injectable()
export class AppsService {
    private baseUrl = 'http://localhost:8089/immobilier';

    constructor(private http: HttpClient) {}

    
/////
    
    getMessages(user: string): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.baseUrl}/messages/${user}`);
    }
    
    sendMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(`${this.baseUrl}/messages`, message);
    }
    
    getConversationMessages(sender: string, receiver: string): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.baseUrl}/conversation/${sender}/${receiver}`);
    }



////


    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/authenticate/users`);
    }

    
 
    public getChatJSON(): Observable<Chat[]> {
        return this.http.get<Chat[]>(`${this.baseUrl}/messages`)
    }

    public getFileManagerJson(): Observable<Files[]> {
        return this.http.get<Files[]>("./assets/data/apps/file-manager-data.json")
    }

    public getMailJson(): Observable<Mail[]> {
        return this.http.get<Mail[]>("./assets/data/apps/mail-data.json")
    }

    public getProjectListJson(): Observable<ProjectList[]> {
        return this.http.get<ProjectList[]>("./assets/data/apps/project-list-data.json")
    }
  
    
}

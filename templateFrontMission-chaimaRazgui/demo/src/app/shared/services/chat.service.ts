import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../Models/chat-message';
import { BehaviorSubject } from 'rxjs';
import { Chat } from '../interfaces/chat.type';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient:any;
  private messageSubject: BehaviorSubject<ChatMessage[]> =new BehaviorSubject<ChatMessage[]>([])//to hold chat messages
  private userSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Added userSubject to hold the user list

  
  constructor(private httpClient: HttpClient) { 
    this.initConnectionSocket();// na3mlou fi initialisaton lel connection mtaa l websocket
  }

  initConnectionSocket(){
    const url='//localhost:8089/immobilier/chat-socket';// Client STOMP pour la communication WebSocket
    const socket = new SockJS(url);// instance mel SockJs
    this.stompClient=Stomp.over(socket)// Utiliser STOMP sur SockJS
  }


  // Rejoindre une salle de chat w fazet
  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => { // haka ta3mel Connect to the WebSocket server
      // 3malna subscribe l topic associé bel room id
        this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
          console.log("messages",messages);
          
            const messageContent = JSON.parse(messages.body);//hethi pour Analyser le contenu du message

            console.log("messageContent",messageContent);
            
            const message = { ////by sifon
              message: messageContent.user,
              user: messageContent.message
            }   
            
      // Get the current messages, append the new message, and emit the updated array
        const currentMessages = this.messageSubject.getValue();
        currentMessages.push(message);

        this.messageSubject.next(currentMessages); // na3mlou updat lel array mtaa misaget
        });
    })
    this.loadMessage(roomId);// nchargi les messages mtaa room hathika
}
// na3mloi Envoyer un message à la salle spécifiée
sendMessage(roomId: string, chatMessage: ChatMessage) {
  this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));//naba3thou l message via stomp
}

getMessageSubject(){
  return this.messageSubject.asObservable();// nreturni les messages el mawjoudin fi room athika
}




// Charger les messages pour une salle spécifique
 loadMessage(roomId: string): void {
  this.httpClient.get<any[]>(`http://localhost:8089/api/chat/${roomId}`).pipe(
    map(result => {
      return result.map(res => {//mapper aka l resultat mtaa l'api lel objet chatmessage
        return {
          user: res.user_name,
          message: res.message
        } as ChatMessage;
      });
    })
  ).subscribe({
    next: (chatMessage: ChatMessage[]) => {
      this.messageSubject.next(chatMessage);
    },
    error: (error) => {
      console.log(error);
    }
  });
}








getUsers(): void {
  this.httpClient.get<any[]>(`http://localhost:8089/immobilier/getALLUsers`).subscribe({
    next: (users: any[]) => {
      console.log('Fetched users:', users); // Debug 
      this.userSubject.next(users);
    },
    error: (error) => {
      console.log(error);
    }
  });
}

  getUserSubject() {
    return this.userSubject.asObservable();
  }}

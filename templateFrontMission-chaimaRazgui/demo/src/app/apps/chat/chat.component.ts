import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core'
import { Chat } from '../../shared/interfaces/chat.type';
import { AppsService } from '../../shared/services/apps.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ChatMessage } from 'src/app/shared/Models/chat-message';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
    userId: string = ""; 
    messageInput: string = ''; 
    messageList: any[] = []; 
    userList: any[] = []; 
    
    //narj3ou ghodoi
    connectedUser: any; //##jeudi f lil
    

    constructor(private chatService: ChatService, private route: ActivatedRoute){}

// les Méthodes appelée lors de l'initialisation du composant
    ngOnInit(): void {
    this.userId=this.route.snapshot.params["userId"];
    this.chatService.joinRoom("ABC");
    this.lisenerMessage();
    this.loadUsers(); // Load users when component initializes
    this.loadConnectedUser(); // Load the connected user's information #jeudi f lil

    }


sendMessage() {
    console.log(this.messageInput); 
    const chatMessage = {
        message: this.messageInput,
        user: this.userId // Utiliser l'ID de l'utilisateur actuel
    } as ChatMessage;
    this.chatService.sendMessage("ABC", chatMessage); // Envoyer le message via le service de chat
    this.messageInput = ''; // Réinitialiser le champ de saisie du message
}
   
    lisenerMessage() {
        this.chatService.getMessageSubject().subscribe((messages: any) => {
            this.messageList = messages.map((item: any) => ({
                ...item,
                message_side: item.user === this.userId ? 'sender' : 'receiver' // Définir le côté du message (expéditeur ou récepteur)
            }));
        });
    }




loadUsers() {
    this.chatService.getUsers();
    this.chatService.getUserSubject().subscribe((users: any) => {
    console.log('User list:', users); // Debug log
    this.userList = users;
    });
    console.log('list:', this.userList); // Debug log

}
  // Méthode pour mettre à jour l'ID de l'utilisateur sélectionné
  updateUser(user: any) {
    this.userId = user;
}
    


  //jeudi f lil##
  // Method to load connected user's information
loadConnectedUser() {
    // Replace this with actual logic to fetch connected user's information
    this.connectedUser = {
        username: 'connectedUserName' // Replace with actual data
    };


}}
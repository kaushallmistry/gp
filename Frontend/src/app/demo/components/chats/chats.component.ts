import { Component } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  messages: Message[] = [];
  newMessage = '';
  chatHeight = '400px';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        severity: 'info',
        detail: this.newMessage
      });
      this.newMessage = '';
      setTimeout(() => {
        this.chatHeight = (parseInt(this.chatHeight, 10) + 40) + 'px';
      }, 0);
    }
  }
}


import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message{
  constructor(public author: string, public content: string){}
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  conversation = new Subject <Message[]>();
  messageMap:any = {
    "hi":"hello",
    "Hi":"Hello",
    "who are you": "My name is Riya-AI Bot",
    "Who are you": "My name is Riya-AI Bot",
    "What is angular":"Angular is the best framework ever!",
    "what is angular": "Angular is the best framework ever!",
    "default":"I can't understand. Can you please repeat or you can contact riya@gmail.com"
  }
  getBotAnswer(msg:any){
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500)
  }

  getBotMessage(question:string){
    let answer = this.messageMap[question]
    return answer || this.messageMap['default']
  }

}

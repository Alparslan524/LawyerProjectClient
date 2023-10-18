import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessageType, position: Position, delay: number = 2, dismissOthers: boolean = false) {
  message(message: string, options: Partial<AlertifyOptions>) { //Partial<> dememizin sebebi metodu kullanırken direkt 
    alertify.set('notifier', 'position', options.position);     //parametre içinde {} kullanarak eğerleri verebilmemizdir
    alertify.set('notifier', 'delay', options.delay);
    const notification = alertify[options.messageType](message);
    if (options.dismissOthers) {
      notification.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopRight;
  delay: number = 2;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopCenter = 'top-center',
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomCenter = 'bottom-center',
  BottomLeft = 'bottom-left',
}

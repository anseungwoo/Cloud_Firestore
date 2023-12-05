import { FirebaseTypeChange } from '../utils/FirebaseTypeChange';
//baqViz3pzgSOHhztfEhOPLoEVHN2
export class MessageList {
  readonly id: number;
  readonly userId: string;
  nickName: string;
  message: string;
  applyDate: Date;

  constructor(
    id: number,
    userId: string,
    nickName: string,
    message: string,
    applyDate: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.nickName = nickName;
    this.message = message;
    this.applyDate = applyDate;
  }

  static fromData(data: any): MessageList {
    try {
      const id: number = FirebaseTypeChange.numberFromData(data['id']);
      const userId: string = FirebaseTypeChange.stringFromData(data['userId']);
      const nickName: string = FirebaseTypeChange.stringFromData(
        data['nickName']
      );
      const message: string = FirebaseTypeChange.stringFromData(
        data['message']
      );

      const applyDate: Date = FirebaseTypeChange.dateFromData(
        data['applyDate']
      );

      return new MessageList(id, userId, nickName, message, applyDate);
    } catch (error) {
      console.log(`[MessageList] fromData e:${error}`);
      return MessageList.empty;
    }
  }

  get toMap() {
    return {
      id: this.id,
      userId: this.userId,
      nickName: this.nickName,
      message: this.message,

      applyDate: this.applyDate,
    };
  }

  static get empty() {
    return new MessageList(0, '', '', '', new Date());
  }
}

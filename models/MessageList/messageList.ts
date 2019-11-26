import { model, Document, Types} from 'mongoose'
import { MessageSchema } from '../../models/MessageList/schema'
import { ICreateMassage } from '../../types/IMessageList';

const MessagesModel = model('Message', MessageSchema, 'zc_messages');

export const messageListModel = {
    /***
    创建一条文档
    */
    createOne: (value: ICreateMassage, call: (err: any, res: Array<Document>) => any) => {
      MessagesModel.create(
        value,
        call
      )
    },
    /***
    创建一条文档
    */
   findList: (call: (err: any, res: Array<Document>) => any) => {
    MessagesModel.find(
      {},
      call
    )
  },
  remove: (id: string, call: (err: any, res: Array<Document>) => any) => {
    MessagesModel.findOneAndRemove(
      Types.ObjectId(id),
      call
    )
  },
}

import { model, Document, Types} from 'mongoose'
import { MessageSchema } from '../../models/MessageList/schema'
import { ICreateMessage } from '../../types/IMessageList';

const MessagesModel = model('Message', MessageSchema, 'zc_messages');

export const messageListModel = {
  /***
  创建一条文档
  */
  createOne: (value: ICreateMessage, call: (err: any, res: Array<Document>) => any) => {
    MessagesModel.create(
      value,
      call
    )
  },
  /**
   分页条件查询
   */
  findList: ({page, size, deviceType}, call: (err: any, res: Array<Document>) => any) => {
    size = parseInt(size)
    let option = {}

    if(deviceType) {
      option = {
        type: deviceType
      }
    }

    MessagesModel.find(
      option,
      call
    ).limit(size)
    .skip(page * size - size)
    .sort([['_id',-1]])
  },
  /**
   删除 ID
  */
  remove: (id: string, call: (err: any, res: any) => any) => {
    MessagesModel.findOneAndRemove(
      Types.ObjectId(id),
      call
    )
  },
}

import { model, Document} from 'mongoose'
import { UserSchema } from '../../models/User/schema'
import { IUserModel } from '../../types/IUser';

const UserModel = model('User', UserSchema, 'zc_user');

export const userModel = {
  /***
  创建一条文档
  */
  createOne: (value: IUserModel, call: (err: any, res: Array<Document>) => any) => {
    UserModel.create(
      value,
      call
    )
  },
}

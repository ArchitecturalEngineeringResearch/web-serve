export interface ICreateMessage {
  title: string;
  type: string;
  description: string;
  phoneNumber: number;
  createDate: string | number;
  endDate: string | number;
  province: string;
  city: string;
  longitude: string;
  status: Number, // 0 租 1 需求
  photos: [String],
  latitude: string;
  unionId: string;
  openId: string;
}

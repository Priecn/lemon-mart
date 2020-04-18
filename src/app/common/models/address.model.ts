export interface IAddress {
    id: number;
    address: string;
    landmark: string;
    areaName: string;
    city: string;
    state: string;
    pinCode: number;
}
export class Address {
    public id: number;
    public address: string;
    public landmark: string;
    public areaName: string;
    public city: string;
    public state: string;
    public pinCode: number;
  constructor(address ?: IAddress) {
    this.id = address.id;
    this.address = address.address;
    this.landmark = address.landmark;
    this.areaName = address.areaName;
    this.city = address.city;
    this.state = address.state;
    this.pinCode = address.pinCode;
  }
}

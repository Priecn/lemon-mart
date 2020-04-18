export interface IBatch {
  id: number;
  batchNumber: number;
  productId: number;
  manufacturedDate: Date;
  expiryDate: Date;
  supplier: number;
  buyingPrice: number;
  sellingPrice: number;
  minimumSellingPrice: number;
  mrp: number;
  boxes: number;
  looseQuantities: number;
}

export class Batch {
  public id: number;
  public batchNumber: number;
  public productId: number;
  public manufacturedDate: Date;
  public expiryDate: Date;
  public supplier: number;
  public buyingPrice: number;
  public sellingPrice: number;
  public minimumSellingPrice: number;
  public mrp: number;
  public boxes: number;
  public looseQuantities: number;
  constructor(batch?: IBatch) {
    this.id = batch && batch.id || null;
    this.batchNumber = batch && batch.batchNumber || -1;
    this.productId = batch && batch.productId || -1;
    this.manufacturedDate = batch && batch.manufacturedDate || null;
    this.expiryDate = batch && batch.expiryDate || null;
    this.supplier = batch && batch.supplier || -1;
    this.buyingPrice = batch && batch.buyingPrice || 0;
    this.sellingPrice = batch && batch.sellingPrice || 0;
    this.minimumSellingPrice = batch && batch.minimumSellingPrice || 0;
    this.mrp = batch && batch.mrp || 0;
    this.boxes = batch && batch.boxes || 0;
    this.looseQuantities = batch && batch.looseQuantities || 0;
  }
}

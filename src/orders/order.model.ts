import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
 
export type OrderDocument = Order & Document;
 
@Schema()
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  product_id: Types.ObjectId;
 
  @Prop({ required: true })
  item_quantity: number;
 
  @Prop({ required: true })
  item_price: number;
}
 
const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
 
@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: "Member", required: true })
  member_id: Types.ObjectId;
 
  @Prop({ type: [OrderItemSchema], required: true })
  order_items: OrderItem[];
 
  @Prop({ required: true })
  order_total: number;
 
  @Prop({
    default: "PENDING",
    enum: ["PENDING", "CONFIRMED", "COOKING", "DELIVERING", "DELIVERED", "CANCELLED"],
  })
  order_status: string;
 
  @Prop()
  order_note: string;
 
  @Prop()
  delivery_address: string;
}
 
export const OrderSchema = SchemaFactory.createForClass(Order);
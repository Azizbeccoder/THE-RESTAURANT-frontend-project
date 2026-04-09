import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
 
export type ProductDocument = Product & Document;
 
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  product_name: string;
 
  @Prop({ required: true })
  product_price: number;
 
  @Prop({ required: true, enum: ["DISH", "SALAD", "DRINK", "DESSERT", "OTHER"] })
  product_category: string;
 
  @Prop({ required: true, enum: ["SMALL", "NORMAL", "BIG"] })
  product_size: string;
 
  @Prop({ default: 0 })
  product_views: number;
 
  @Prop({ default: 0 })
  product_likes: number;
 
  @Prop({ default: 0 })
  product_sold: number;
 
  @Prop({ type: [String], default: [] })
  product_images: string[];
 
  @Prop()
  product_desc: string;
}
 
export const ProductSchema = SchemaFactory.createForClass(Product);
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Order, OrderDocument } from "./order.model";
 
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}
 
  async create(
    memberId: string,
    dto: {
      order_items: { product_id: string; item_quantity: number; item_price: number }[];
      order_note?: string;
      delivery_address?: string;
    }
  ) {
    const total = dto.order_items.reduce(
      (sum, i) => sum + i.item_price * i.item_quantity,
      0
    );
 
    const order = new this.orderModel({
      member_id:        new Types.ObjectId(memberId),
      order_items:      dto.order_items.map((i) => ({
        ...i,
        product_id: new Types.ObjectId(i.product_id),
      })),
      order_total:      total,
      order_note:       dto.order_note,
      delivery_address: dto.delivery_address,
    });
 
    return order.save();
  }
 
  async getMyOrders(memberId: string) {
    return this.orderModel
      .find({ member_id: memberId })
      .populate("order_items.product_id", "product_name product_images")
      .sort({ createdAt: -1 })
      .exec();
  }
 
  async getById(orderId: string) {
    const order = await this.orderModel
      .findById(orderId)
      .populate("order_items.product_id")
      .exec();
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }
 
  async updateStatus(orderId: string, status: string) {
    const updated = await this.orderModel
      .findByIdAndUpdate(orderId, { order_status: status }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException("Order not found");
    return updated;
  }
 
  // Admin: get all orders
  async getAll() {
    return this.orderModel
      .find()
      .populate("member_id", "mb_nick mb_email")
      .sort({ createdAt: -1 })
      .exec();
  }
}
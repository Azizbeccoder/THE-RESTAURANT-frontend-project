import {
  Controller, Get, Post, Put,
  Body, Param, Req, UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "../auth/auth.guard";
 
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
 
  // Place a new order (must be logged in)
  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: any, @Body() body: any) {
    return this.ordersService.create(req.user._id, body);
  }
 
  // Get my own orders
  @Get("my")
  @UseGuards(AuthGuard)
  getMyOrders(@Req() req: any) {
    return this.ordersService.getMyOrders(req.user._id);
  }
 
  // Get single order by id
  @Get(":id")
  @UseGuards(AuthGuard)
  getById(@Param("id") id: string) {
    return this.ordersService.getById(id);
  }
 
  // Update order status (admin/restaurant)
  @Put(":id/status")
  @UseGuards(AuthGuard)
  updateStatus(@Param("id") id: string, @Body("status") status: string) {
    return this.ordersService.updateStatus(id, status);
  }
 
  // Admin: get all orders
  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.ordersService.getAll();
  }
}
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { Member,  MemberSchema  } from "./members/member.model";
import { Product, ProductSchema } from "./products/product.model";
import { Order,   OrderSchema   } from "./orders/order.model";

import { MembersController  } from "./members/members.controller";
import { ProductsController } from "./products/products.controller";
import { OrdersController   } from "./orders/orders.controller";
import { AuthController     } from "./auth/auth.controller";

import { MembersService  } from "./members/members.service";
import { ProductsService } from "./products/products.service";
import { OrdersService   } from "./orders/orders.service";
import { AuthService     } from "./auth/auth.service";
import { AuthGuard       } from "./auth/auth.guard";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/burak"
    ),
    MongooseModule.forFeature([
      { name: Member.name,  schema: MemberSchema  },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name,   schema: OrderSchema   },
    ]),
    // Serve uploaded images statically at /api/images/filename.jpg
    ServeStaticModule.forRoot({
      rootPath:   join(__dirname, "..", "uploads"),
      serveRoot:  "/api/images",
    }),
  ],
  controllers: [
    AuthController,
    MembersController,
    ProductsController,
    OrdersController,
  ],
  providers: [
    AuthService,
    AuthGuard,
    MembersService,
    ProductsService,
    OrdersService,
  ],
})
export class AppModule {}
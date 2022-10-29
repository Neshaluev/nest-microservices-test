
import { CartProduct } from "./cart-product"
import { WishlistProduct } from "./wishlist-product"

type TPayload = WishlistProduct | CartProduct

export type EventPayload  = {
    event: string , 
    data: {
        userId: string, 
        product?: TPayload, 
        order?: any, 
        qty?: number  
    }
}
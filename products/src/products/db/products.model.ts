
export class ProductsModel{
    constructor(
        private _id: string,

        private name: string,

        private desc: string,
    
        private banner: string,
    
        private type: string,
    
        private unit: number,
    
        private price: number,
    
        private available: boolean,
    
        private suplier: string,
    ){
    }

    getId(): string{
        return this._id
    }

    getName(): string{
        return this.name
    }

    getDesc(): string {
        return this.desc
    }

    getBanner(): string {
        return this.banner
    }

    getType(): string {
        return this.type
    }

    getUnit(): number {
        return this.unit
    }

    getPrice(): number {
        return this.price
    }

    getAvailable(): boolean {
        return this.available
    }

    getSuplier(): string {
        return this.suplier
    }
}
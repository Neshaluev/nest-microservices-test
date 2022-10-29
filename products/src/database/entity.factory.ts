export interface EntityFactory<TEntitty> {
    create(...args: any): TEntitty | Promise<TEntitty>
}
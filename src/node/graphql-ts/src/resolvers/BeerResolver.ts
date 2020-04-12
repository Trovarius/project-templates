interface BeerInput {
  id: Number;
}

export interface BeerEntity {
    id: Number
    name: String
    proof: Number
}

class Beer {
    id: Number | undefined
    name: String | undefined
    proof: Number | undefined
}

let data : Array<BeerEntity> = [
    { id: 1, name: "Guiness", proof: 21 },
    { id: 80, name: "Nortada", proof: 10 },
    { id: 20, name: "SKOL", proof: 50 },
    { id: 40, name: "SUPER BOCK", proof: 8 },
    { id: 32, name: "SAGRES", proof: 100 },
    { id: 8, name: "Crystal", proof: 3 },
]

interface ShopEntity{
    id: Number,
    name: String
}

interface IQuery<T, R>{
    Handler(obj: T, args: any, context: any, info: any) : R
}


class ShopQueryHandler implements IQuery<BeerEntity, Array<ShopEntity>>{

    Handler(obj: BeerEntity, args: any, context: any, info: any) : Array<ShopEntity>{
        return obj.proof > 30 
            ? [{id: 1, name: "Continente"}, {id: 1, name: "LIDL"}]
            : [{id: 1, name: "PingoDoce"}, {id: 1, name: "MiniPreco"}]
    }
}

const sellInHandler : IQuery<BeerEntity, Array<ShopEntity>> = new ShopQueryHandler();

export default {
  Query: {
    getBeers: () : Array<BeerEntity> => data,
    getBeer: (obj: any, args: BeerInput, context: any, info: any) : Beer => {
      return data.filter(x => x.id == args.id)[0];
    }
  },
  Type:{
    Beer: {
        isAllowed: (obj: BeerEntity, args: BeerInput, context: any, info: any) : Boolean => {
            return obj.proof > 20;
          },
          sellIn: sellInHandler.Handler
      },
  },
  Mutation: {
    Beer: () => ({
      add({ input } : { input: BeerEntity }) : BeerEntity {
        data.push({ id: data.length, ...input });
        return data[data.length -1];
      },
      remove({ id } : { id: Number }) : Boolean {
        data = data.filter(x => x.id !== id);
        return true;
      } 
    })
  },
};


class ShopQueryHandler implements BeerShopQuery{

    Handler(beer: BeerEntity) : Array<ShopEntity>{
        return beer.proof > 30 
            ? [{id: 1, name: "Continente"}, {id: 1, name: "LIDL"}]
            : [{id: 1, name: "PingoDoce"}, {id: 1, name: "MiniPreco"}]
    }
}
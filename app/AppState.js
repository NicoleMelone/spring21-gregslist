import Car from "./Models/Car.js"
import House from "./Models/House.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {Car[]} */
  cars = [
    new Car('Ford', 'Pinto', 1975, 1000, 'ITS HOT!', 'https://pbs.twimg.com/media/ETpZLKZXgAANyBw.jpg'),
    new Car('AMC', 'Gremlin', 1972, 1200, 'Gremlin Green!', 'https://cdn1.mecum.com/auctions/fl0120/fl0120-395915/images/1-1572992729058@2x.jpg?1574881322000'),
    new Car('Volkswagen', 'Rabbit', 1983, 2990, 'Not an actual rabbit', 'https://hips.hearstapps.com/roa.h-cdn.co/assets/cm/14/47/546b400aba069_-_gti11-lg.jpg'),
    new Car('Zastava', 'Yugo', 1988, 100, 'spome rust', 'https://media.istockphoto.com/photos/old-rusty-red-broken-and-damaged-yugo-car-full-of-junk-parked-and-on-picture-id1056309302?s=612x612')
  ]
  /** @type {House[]} */
  houses = [
    new House(4, 3, 2100, '111 Brookfield Ave. Boise, ID 85678', 450000, 'https://buildbetterhomes.ca/wp-content/uploads/2019/11/HAP2910-logo.gif'),
    new House(3, 2, 1800, '22 Streamside Drive Boise, ID 89456', 550000, 'https://static6.depositphotos.com/1033914/642/i/950/depositphotos_6424748-stock-photo-pretty-house-in-giethoorn.jpg'),
    new House(6, 6.5, 5000, '3333 Fancy Lane Eagle, ID 93764', 1100000, 'https://static1.mansionglobal.com/production/media/article-images/ae4995fa7b11767a70af58edb374c380/large_Toll-Brothers-19-Marbella-Cassis-SC_Rear-Elevation_CC.jpg')

  ]

}

// NOTE Oh oh.. its magic! Ya know!
export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js";

function _draw() {
    let houses = ProxyState.houses
    let template = ''
    houses.forEach(house => {
        template += house.Template
    })
    document.getElementById('houses').innerHTML = template
}


export default class HousesController {
    constructor() {
        ProxyState.on('houses', _draw);

        _draw()
    }

    createHouse() {
        window.event.preventDefault()
        const form = window.event.target

        let newHouse = {
            bedrooms: Number(form.bedrooms.value),
            bath: Number(form.bath.value),
            sqFootage: Number(form.sqFottage.value),
            address: form.address.value,
            price: Number(form.price.value),
            imgUrl: form.imgUrl.value

        }
        housesService.createHouse(newHouse)

        form.reset()
        $('#new-house-form').modal('hide')
    }

    deleteHouse(id) {
        housesService.deleteHouse(id)
    }

    bid(id) {
        housesService.bid(id)
    }
}


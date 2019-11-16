import * as loremIpsum from 'fast-lorem-ipsum'

let nextId= 1

export function createNotification() {
    return {
        id: nextId++,
        name: loremIpsum(getRandomInt(3, 13),'w'),
        description: loremIpsum(getRandomInt(3, 7),'w')
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

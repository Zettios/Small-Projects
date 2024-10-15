export default class Card {
    constructor(shape, number, name, unicode) {
        this.shape = shape;
        this.number = number;
        this.name = name;
        this.unicode = unicode;
    }

    getShape() {
        return this.shape;
    }

    getNumber() {
        return this.number;
    }

    getName() {
        return this.name;
    }

    getUnicode() {
        return this.unicode;
    }
}
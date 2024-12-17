import { Sword } from './Sword.js'

export class Axe extends Sword{
    constructor() {
        super();
        this.name = 'Секира';
        this.attack = 27;
        this.durability = 800;
        this.initDurability = 800;
    }
}
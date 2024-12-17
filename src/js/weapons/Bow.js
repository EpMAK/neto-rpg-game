import { Weapon } from './Weapon.js'

export class Bow extends Weapon{
    constructor() {
        super('Лук', 10, 200, 3);
    }
}
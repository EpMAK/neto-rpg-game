import { Weapon } from './Weapon.js'

export class Knife extends Weapon{
    constructor() {
        super('Нож', 5, 300, 1);
    }
}
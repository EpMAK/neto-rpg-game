import { Weapon } from './Weapon.js'

export class Arm extends Weapon{
    constructor() {
        super('Рука', 1, Infinity, 1);
    }
}
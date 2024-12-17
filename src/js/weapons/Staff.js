import { Weapon } from './Weapon.js'

export class Staff extends Weapon{
    constructor() {
        super('Посох', 8, 300, 2);
    }
}
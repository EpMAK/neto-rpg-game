import { Mage } from './Mage.js'
import { StormStaff } from '../weapons/Stormstaff.js';
import { Knife } from "../weapons/Knife.js";
import { Arm } from "../weapons/Arm.js";

export class Demiurge extends Mage{
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.attack = 6;
        this.luck = 12;
        this.magic = 120;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
        this.weapons = [this.weapon, new Knife(), new Arm()];
        this.currentWeaponIndex = 0;
    }

    getDamage(distance) {
        let damage = super.getDamage(distance);
        if (this.magic > 0 && this.getLuck() > 0.6) {
            damage *= 1.5;
        }
        return damage;
    }
}
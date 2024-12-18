import { Player } from './Player.js'
import { Staff } from '../weapons/Staff.js'
import { Knife } from "../weapons/Knife.js";
import { Arm } from "../weapons/Arm.js";

export class Mage extends Player{
    constructor(position, name) {
        super(position, name);
        this.life = 70;
        this.attack = 5;
        this.agility = 8;
        this.magic = 100;
        this.description = 'Маг';
        this.weapon = new Staff();
        this.weapons = [this.weapon, new Knife(), new Arm()];
        this.currentWeaponIndex = 0;
    }

    takeDamage(damage) {
        if (this.magic > 50) {
            damage /= 2;
            this.magic -= 12;
        }
        super.takeDamage(damage);
    }
}
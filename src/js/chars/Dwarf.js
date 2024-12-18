import { Warrior } from './Warrior.js'
import { Axe } from '../weapons/Axe.js'
import { Knife } from "../weapons/Knife.js";
import { Arm } from "../weapons/Arm.js";

export class Dwarf extends Warrior{
    constructor(position, name) {
        super(position, name);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.weapons = [this.weapon, new Knife(), new Arm()];
        this.currentWeaponIndex = 0;
        this.hitCount = 0;
    }

    takeDamage(damage) {
        this.hitCount++;
        if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
            damage /= 2;
        }
        super.takeDamage(damage);
    }
}
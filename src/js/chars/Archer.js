import { Player } from './Player.js'
import { Bow } from '../weapons/Bow.js'
import { Knife } from "../weapons/Knife.js";
import { Arm } from "../weapons/Arm.js";

export class Archer extends Player{
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.attack = 5;
        this.agility = 10;
        this.magic = 35;
        this.description = 'Лучник';
        this.weapon = new Bow();
        this.weapons = [this.weapon, new Knife(), new Arm()];
        this.currentWeaponIndex = 0;
    }

    getDamage(distance) {
        const weaponDamage = this.weapon.getDamage();
        return (this.attack + weaponDamage) * this.getLuck() * distance / this.weapon.range;
    }
}
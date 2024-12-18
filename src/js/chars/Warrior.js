import { Player } from './Player.js'
import { Sword } from '../weapons/Sword.js'
import { Knife } from '../weapons/Knife.js'
import { Arm } from "../weapons/Arm.js";

export class Warrior extends Player{
    constructor(position, name) {
        super(position, name);
        this.initialLife = 120;
        this.life = this.initialLife;
        this.speed = 2;
        this.description = 'Воин';
        this.weapon = new Sword();
        this.weapons = [this.weapon, new Knife(), new Arm()];
        this.currentWeaponIndex = 0;
    }

    takeDamage(damage) {
        if (this.life <= this.initialLife / 2 && this.getLuck() > 0.8 && this.magic > 0) {
            if (this.magic >= damage) {
                this.magic -= damage;
            } else {
                const remainingDamage = damage - this.magic;
                this.magic = 0;
                this.life -= remainingDamage;
            }
        } else {
            this.life -= damage;
        }
    }
}
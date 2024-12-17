export class Weapon {
    constructor(name, attack, durability, range) {
        this.name = name;
        this.attack = attack;
        this.durability = durability;
        this.initDurability = durability;
        this.range = range;
    }

    takeDamage(damage) {
        this.durability = Math.max(0, this.durability - damage);
    }

    getDamage() {
        if (this.durability === 0) {
            return 0;
        }
        return this.durability >= this.initDurability * 0.3 ? this.attack : this.attack / 2;
    }

    isBroken() {
        return this.durability === 0;
    }
}
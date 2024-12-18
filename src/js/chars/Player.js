import { Arm } from '../weapons/Arm.js'
import { Knife } from '../weapons/Knife.js'

export class Player {
    constructor(position, name) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
        this.currentWeaponIndex = 0;
        this.weapons = [this.weapon, new Knife()];
    }

    getLuck() {
        const randomNumber = Math.random() * 100;
        return (randomNumber + this.luck) / 100;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) {
            return 0;
        }
        const weaponDamage = this.weapon.getDamage();
        return (this.attack + weaponDamage) * this.getLuck() / distance;
    }

    takeDamage(damage) {
        this.life = Math.max(0, this.life - damage);
    }

    isDead() {
        return this.life <= 0;
    }

    moveLeft(distance) {
        const maxDistance = Math.min(distance, this.speed);
        this.position = Math.max(0, this.position - maxDistance);
    }

    moveRight(distance) {
        const maxDistance = Math.min(distance, this.speed);
        this.position += maxDistance;
    }

    move(distance) {
        if (distance < 0) {
            this.moveLeft(-distance);
        } else {
            this.moveRight(distance);
        }
    }

    isAttackBlocked() {
        return this.getLuck() > (100 - this.luck) / 100;
    }

    dodged() {
        return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
    }

    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            this.weapon.takeDamage(damage);
            console.log(`${this.name} блокирует удар!`);
        } else if (this.dodged()) {
            console.log(`${this.name} уклоняется от удара!`);
        } else {
            this.takeDamage(damage);
            console.log(`${this.name} получает ${damage} урона!`);
        }
    }

    checkWeapon() {
        if (this.weapon.isBroken()) {
            this.currentWeaponIndex++;
            if (this.currentWeaponIndex < this.weapons.length) {
                this.weapon = this.weapons[this.currentWeaponIndex];
                console.log(`${this.name} меняет оружие на ${this.weapon.name}!`);
            } else {
                console.log(`${this.name} остался без оружия!`);
            }
        }
    }

    tryAttack(enemy) {
        console.log(`${this.name} пытается атаковать ${enemy.name}`);
        const distance = Math.abs(this.position - enemy.position);
        console.log(`Расстояние: ${distance}`);

        if (distance > this.weapon.range) {
            console.log(`${this.name} не достает до ${enemy.name}!`);
            return;
        }


        this.weapon.takeDamage(10 * this.getLuck());

        let damage = this.getDamage(distance);
        console.log(`Урон: ${damage}`);
        if (this.position === enemy.position) {
            enemy.moveRight(1);
            damage *= 2;
            console.log(`${this.name} наносит удар в упор по ${enemy.name}!`);
        } else {
            console.log(`${this.name} атакует ${enemy.name}!`);
        }

        console.log(`Жизнь ${enemy.name}: ${enemy.life}`);
        enemy.takeAttack(damage);
        this.checkWeapon();
    }

    chooseEnemy(players) {
        const alivePlayers = players.filter(player => !player.isDead() && player !== this);
        if (alivePlayers.length === 0) {
            return null;
        }

        return alivePlayers.reduce((minPlayer, currentPlayer) =>
            currentPlayer.life < minPlayer.life ? currentPlayer : minPlayer
        );
    }

    moveToEnemy(enemy) {
        if (!enemy) {
            return;
        }

        const distance = enemy.position - this.position;
        let moveDistance = Math.abs(distance) - this.weapon.range;

        if (moveDistance < 0) {
            moveDistance = 0;
        } else {
            moveDistance = Math.min(moveDistance, this.speed); // Add this line
        }

        this.move(Math.sign(distance) * moveDistance);
        console.log(`${this.name} двигается к ${enemy.name}!`);
    }

    turn(players) {
        console.log(`${this.name} начинает ход`);
        const enemy = this.chooseEnemy(players);
        console.log(`${this.name} выбрал врага: ${enemy ? enemy.name : 'нет врагов'}`);
        this.moveToEnemy(enemy);
        if (enemy) {
            this.tryAttack(enemy);
        }
        console.log(`${this.name} закончил ход`);
    }
}
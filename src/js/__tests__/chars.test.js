import { Player } from "../chars/Player.js";
import { Archer } from "../chars/Archer.js";
import { Crossbowman } from "../chars/Crossbowman.js";
import { Demiurge } from "../chars/Demiurge.js";
import { Dwarf } from "../chars/Dwarf.js";
import { Mage } from "../chars/Mage.js";
import { Warrior } from "../chars/Warrior.js";
import { Weapon } from "../weapons/Weapon.js";
import { Arm } from "../weapons/Arm.js";
import { Longbow } from "../weapons/Longbow.js";
import { Bow } from "../weapons/Bow.js";
import { Axe } from "../weapons/Axe.js";
import { Sword } from "../weapons/Sword.js";
import { Knife } from "../weapons/Knife.js";
import { Staff } from "../weapons/Staff.js";
import { StormStaff } from "../weapons/StormStaff.js";
import {play} from '../game.js';

describe('Player', () => {
    let player;
    beforeEach(() => {
        player = new Player(5, 'Тестовый Игрок');
    });

    it.each([
        [3, 4],
        [1, 4],
        [10, 4],
    ])('should move left correctly with distance %p', (distance, expectedPosition) => {
        player.moveLeft(distance);
        expect(player.position).toBe(expectedPosition);
    });

    it.each([
        [2, 6],
        [1, 6],
        [10, 6],
    ])('should move right correctly with distance %p', (distance, expectedPosition) => {
        player.moveRight(distance);
        expect(player.position).toBe(expectedPosition);
    });

    it.each([
        [2, 6],
        [-3, 4],
    ])('should move correctly with distance %p', (distance, expectedPosition) => {
        player.move(distance);
        expect(player.position).toBe(expectedPosition);
    });

    it.each([
        [0.95, true],
        [0.1, false],
    ])('should check attack block correctly with luck %p', (luck, expectedResult) => {
        jest.spyOn(player, 'getLuck').mockReturnValue(luck);
        expect(player.isAttackBlocked()).toBe(expectedResult);
    });

    it.each([
        [0.8, false],
        [0.95, true],
    ])('should check dodge correctly with luck %p', (luck, expectedResult) => {
        jest.spyOn(player, 'getLuck').mockReturnValue(luck);
        expect(player.dodged()).toBe(expectedResult);
    });

    it('should take attack with block', () => {
        jest.spyOn(player, 'isAttackBlocked').mockReturnValue(true);
        const weapon = { takeDamage: jest.fn() };
        player.weapon = weapon;
        player.takeAttack(20);
        expect(weapon.takeDamage).toHaveBeenCalledWith(20);
    });

    it('should take attack with dodge', () => {
        jest.spyOn(player, 'dodged').mockReturnValue(true);
        const takeDamageSpy = jest.spyOn(Player.prototype, 'takeDamage');
        player.takeAttack(20);
        expect(takeDamageSpy).not.toHaveBeenCalled();
    });

    it('should take attack with damage', () => {
        jest.spyOn(player, 'isAttackBlocked').mockReturnValue(false);
        jest.spyOn(player, 'dodged').mockReturnValue(false);
        const takeDamageSpy = jest.spyOn(Player.prototype, 'takeDamage');
        player.takeAttack(20);
        expect(takeDamageSpy).toHaveBeenCalledWith(20);
    });

    describe('checkWeapon', () => {
        it('should change weapon if broken', () => {
            const brokenWeapon = { isBroken: jest.fn(() => true), name: 'Сломанное Оружие' };
            const newWeapon = { name: 'Новое Оружие', isBroken: jest.fn(() => false) };
            player.weapon = brokenWeapon;
            player.weapons = [brokenWeapon, newWeapon];
            player.checkWeapon();
            expect(player.weapon.name).toBe(newWeapon.name);
        });

        it('should not change weapon if not broken', () => {
            const notBrokenWeapon = { isBroken: jest.fn(() => false) };
            player.weapon = notBrokenWeapon;
            player.weapons = [notBrokenWeapon];
            player.checkWeapon();
            expect(player.weapon).toBe(notBrokenWeapon);
        });
    });

    it('should try attack correctly', () => {
        const enemy = new Player(6, 'Враг');
        jest.spyOn(player, 'getDamage').mockReturnValue(20);
        jest.spyOn(enemy, 'takeAttack');
        player.tryAttack(enemy);
        expect(enemy.takeAttack).toHaveBeenCalledWith(20);
    });

    it('should choose enemy with lowest health', () => {
        const enemy1 = new Player(1, 'Враг 1');
        enemy1.life = 30;
        const enemy2 = new Player(2, 'Враг 2');
        enemy2.life = 50;
        const players = [player, enemy1, enemy2];
        const chosenEnemy = player.chooseEnemy(players);
        expect(chosenEnemy).toBe(enemy1);
    });

    it('should move to enemy', () => {
        const enemy = new Player(10, 'Враг');
        player.moveToEnemy(enemy);
        expect(player.position).toBe(6);
    });
});

describe.each([
    [Warrior, 120, 2, 'Воин', Sword],
    [Archer, 80, 1, 'Лучник', Bow],
    [Mage, 70, 1, 'Маг', Staff],
    [Dwarf, 130, 2, 'Гном', Axe],
    [Crossbowman, 85, 1, 'Арбалетчик', Longbow],
    [Demiurge, 80, 1, 'Демиург', StormStaff]
])('%p class', (PlayerClass, expectedLife, expectedSpeed, expectedDescription, ExpectedWeapon) => {
    it('should create a player with correct properties', () => {
        const player = new PlayerClass(5, 'Игрок');
        expect(player.life).toBe(expectedLife);
        expect(player.speed).toBe(expectedSpeed);
        expect(player.description).toBe(expectedDescription);
        expect(player.weapon).toBeInstanceOf(ExpectedWeapon);
    });
});

describe('Warrior', () => {
    let warrior;
    beforeEach(() => {
        warrior = new Warrior(5, 'Воин');
    });

    it.each([
        [50, 0.9, 10, 10, 50],
        [60, 0.7, 10, 20, 50],
    ])('should take damage correctly with life %p, luck %p, damage %p', (life, luck, damage, expectedMagic, expectedLife) => {
        warrior.life = life;
        jest.spyOn(warrior, 'getLuck').mockReturnValue(luck);
        warrior.takeDamage(damage);
        expect(warrior.magic).toBe(expectedMagic);
        expect(warrior.life).toBe(expectedLife);
    });
});

describe('Mage', () => {
    let mage;
    beforeEach(() => {
        mage = new Mage(5, 'Маг');
    });

    it.each([
        [20, 60, 10, 20],
        [40, 20, 50, 40],
    ])('should take damage correctly with initial magic %p, damage %p', (initialMagic, damage, expectedLife, expectedMagic) => {
        mage.magic = initialMagic;
        mage.takeDamage(damage);
        expect(mage.life).toBe(expectedLife);
        expect(mage.magic).toBe(expectedMagic);
    });
});

describe('Dwarf', () => {
    let dwarf;
    beforeEach(() => {
        dwarf = new Dwarf(5, 'Гном');
    });

    it('should take reduced damage on every 6th hit with luck', () => {
        jest.spyOn(dwarf, 'getLuck').mockReturnValue(0.6);
        for (let i = 0; i < 5; i++) {
            dwarf.takeDamage(10);
        }
        expect(dwarf.life).toBe(80);

        dwarf.takeDamage(10);
        expect(dwarf.life).toBe(75);
    });
});

describe('Demiurge', () => {
    let demiurge;
    beforeEach(() => {
        demiurge = new Demiurge(5, 'Демиург');
    });

    it.each([
        [0.7, 1, 16.8],
        [0.8, 2, 9.6],
        [0.5, 1, 8]
    ])('should calculate damage correctly with luck %p, distance %p', (luck, distance, expectedDamage) => {
        jest.spyOn(demiurge, 'getLuck').mockReturnValue(luck);
        expect(demiurge.getDamage(distance)).toBeCloseTo(expectedDamage);
    });
});

describe('play', () => {
    it('should determine the winner correctly', () => {
        const warrior = new Warrior(0, "Воин");
        const archer = new Archer(5, "Лучник");
        jest.spyOn(console, 'log');
        play([warrior, archer]);
        expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/победил!/));
    });
});
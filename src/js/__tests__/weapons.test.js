import { Weapon } from "../weapons/Weapon.js";
import { Arm } from "../weapons/Arm.js";
import { Longbow } from "../weapons/Longbow.js";
import { Bow } from "../weapons/Bow.js";
import { Axe } from "../weapons/Axe.js";
import { Sword } from "../weapons/Sword.js";
import { Knife } from "../weapons/Knife.js";
import { Staff } from "../weapons/Staff.js";
import { StormStaff } from "../weapons/StormStaff.js";

describe('Weapon', () => {
    const weaponCases = [
        ['Старый меч', 20, 10, 1],
        ['Новый меч', 30, 20, 2],
    ];

    it.each(weaponCases)('should create a weapon with correct properties', (name, attack, durability, range) => {
        const weapon = new Weapon(name, attack, durability, range);
        expect(weapon.name).toBe(name);
        expect(weapon.attack).toBe(attack);
        expect(weapon.durability).toBe(durability);
        expect(weapon.initDurability).toBe(durability);
        expect(weapon.range).toBe(range);
    });

    const damageCases = [
        [5, 5],
        [50, 0],
    ];

    it.each(damageCases)('should take damage correctly', (damage, expectedDurability) => {
        const weapon = new Weapon('Старый меч', 20, 10, 1);
        weapon.takeDamage(damage);
        expect(weapon.durability).toBe(expectedDurability);
    });

    const getDamageCases = [
        [0, 20],
        [60, 20],
        [71, 10],
        [100, 0],
    ];

    it.each(getDamageCases)('should calculate damage correctly', (damage, expectedDamage) => {
        const weapon = new Weapon('Старый меч', 20, 100, 1);
        weapon.takeDamage(damage);
        expect(weapon.getDamage()).toBe(expectedDamage);
    });

    const isBrokenCases = [
        [0, false],
        [10, true],
    ];

    it.each(isBrokenCases)('should check if broken correctly', (damage, expectedIsBroken) => {
        const weapon = new Weapon('Старый меч', 20, 10, 1);
        weapon.takeDamage(damage);
        expect(weapon.isBroken()).toBe(expectedIsBroken);
    });
});

describe.each([
    [Arm, 'Рука', 1, Infinity, 1],
    [Bow, 'Лук', 10, 200, 3],
    [Sword, 'Меч', 25, 500, 1],
    [Knife, 'Нож', 5, 300, 1],
    [Staff, 'Посох', 8, 300, 2],
    [Longbow, 'Длинный лук', 15, 200, 4],
    [Axe, 'Секира', 27, 800, 1],
    [StormStaff, 'Посох Бури', 10, 300, 3],
])('%p', (WeaponClass, name, attack, durability, range) => {
    it('should create a weapon with correct properties', () => {
        const weapon = new WeaponClass();
        expect(weapon.name).toBe(name);
        expect(weapon.attack).toBe(attack);
        expect(weapon.durability).toBe(durability);
        expect(weapon.range).toBe(range);
    });
});
import { readFileSync } from 'node:fs';

const input = readFileSync('input.txt', 'utf-8');
const potionRequirement = { A: 0, B: 1, C: 3, D: 5 } as const;

type Enemy = keyof typeof potionRequirement

const getNeededPotions = (groupSize: number) => {
  const splitIntoChunks = (string: string) => string.match(new RegExp(`.{${groupSize}}`, 'g'));
  const enemyGroups = splitIntoChunks(input);
  return enemyGroups
    .map(chunk => {
      const group = chunk.split('');
      const enemies = group.filter(enemy => Object.keys(potionRequirement).includes(enemy)) as Array<Enemy>;
      const extraCost = enemies.length > 1 ? groupSize - (groupSize - enemies.length + 1) : 0;
      return enemies.reduce((acc, cur) => acc + potionRequirement[cur] + extraCost, 0);
    })
    .reduce((acc, cur) => acc + cur, 0);
};

console.log(`Round 1: ${getNeededPotions(1)}`);
console.log(`Round 2: ${getNeededPotions(2)}`);
console.log(`Round 3: ${getNeededPotions(3)}`);

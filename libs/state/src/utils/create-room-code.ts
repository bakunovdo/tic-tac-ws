const alphabet = "abcdefjhijklmnopqrstuvwxyz";
const numbers = "0123456789";
const chars = alphabet + numbers;

function getRandomPosInteger(max: number): number {
  return Math.floor(Math.random() * max);
}
// 4 is okay for active 5 players, change collision 0,0015%, can be easily increased
export function createUniqCode(len = 4): string {
  let s = "" + alphabet[getRandomPosInteger(alphabet.length)];

  while (s.length < len) {
    s += chars[getRandomPosInteger(chars.length)];
  }

  return s.toUpperCase();
}

import { customAlphabet } from "nanoid";

const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";

const nolookalikesSafe = "346789ABCDEFGHJKLMNPQRTUVWXYIZ";

/**
  @link nano-id calculator https://zelark.github.io/nano-id-cc/
*/
export const nanoidSafe = customAlphabet(nolookalikesSafe, 7);

export const nanoidNoLikes = customAlphabet(nolookalikes, 20);

export function createUniqCode(): string {
  return nanoidSafe();
}

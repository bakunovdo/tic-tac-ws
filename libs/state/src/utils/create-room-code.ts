import { customAlphabet } from "nanoid";

const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYIZ";

/**
  @link nano-id calculator https://zelark.github.io/nano-id-cc/
*/
const nanoid = customAlphabet(nolookalikes, 10);

export function createUniqCode(): string {
  return nanoid();
}

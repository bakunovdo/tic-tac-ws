import { ServerState } from "./Server";

describe("Server State", () => {
  const state = new ServerState();
  const id = "mock";
  const idA = "mock-a";
  const idB = "mock-b";

  beforeEach(() => state.clearAll());

  test("empty - initial states", () => {
    expect(state.lobby).toBe(0);
    expect(state.rooms.size).toBe(0);
    expect(state.users.size).toBe(0);
  });

  describe("Room", () => {
    test("Create - empty", () => {
      const room = state.createRoom(id);
      const getted = state.rooms.get(id);
      if (!getted) throw new Error();

      expect(getted).toEqual(room);
      expect(getted.canJoin).toEqual(true);
      expect(getted.id).toEqual(id);
      expect(getted.players).toEqual([]);
    });

    test("Create - with players", () => {
      const userA = state.createUser(idA);
      const roomA = state.createRoom(idA, [userA]);
      expect(roomA.len).toBe(1);
      expect(roomA.canJoin).toEqual(true);
      expect(roomA.players).toEqual([userA]);
      expect(roomA.players[0]).toEqual(userA);
      expect(roomA.players[1]).toBeUndefined();
      expect(roomA.has(userA.id)).toBe(true);
      expect(userA.room).toBe(roomA);

      const userB = state.createUser(idB);
      const roomB = state.createRoom(idB, [userA, userB]);

      // last room shold be empty
      expect(state.rooms.get(idA)).toBeUndefined();
      expect(roomA.players[0]).toBeUndefined();
      expect(roomA.players[1]).toBeUndefined();
      expect(roomA.len).toBe(0);

      // new room should be full
      expect(userA.room).toBe(roomB);
      expect(userB.room).toBe(roomB);
      expect(roomB.canJoin).toBe(false);
      expect(roomB.players).toContain(userA);
      expect(roomB.players).toContain(userB);
      expect(roomB.len).toBe(2);

      // A - roomB
      userA.join(roomA); // should be cant , becouse roomA "destroyed"
      userB.join(roomA); // should be cant , becouse roomA "destroyed"
      expect(roomB.players).toEqual([userA, userB]);
      expect(roomA.players).toEqual([]);
      expect(roomA.len).toBe(0);
    });
  });

  describe("User - create", () => {
    test("create user without params", () => {
      const user = state.createUser(id);
      const getted = state.users.get(id);

      expect(getted).toEqual(user);
      expect(getted).toEqual(state.users.get(id));
      expect(getted?.id).toBe(user.id);
      expect(getted?.id).toBe(id);
      expect(getted?.room).toBe(undefined);
    });

    // test("with room", () => {
    //   const room = state.createRoom(id);
    //   const user = state.createUser(id);
    // });
  });

  test("room [has + canJoin] method", () => {
    const room = state.createRoom(id);

    expect(room.has("a")).toBe(false);
    expect(room.has("b")).toBe(false);
    expect(room.canJoin).toBe(true);

    const a = state.createUser("a");
    const b = state.createUser("b");

    a.join(room);
    expect(room.has("a")).toBe(true);
    expect(room.canJoin).toBe(true);

    b.join(room);
    expect(room.has("b")).toBe(true);
    expect(room.canJoin).toBe(false);
  });

  test("join to room by Room instance", () => {
    const room = state.createRoom(id); // should be hidden under hood

    const user = state.createUser(id);

    user.join(room);

    expect(state.rooms.get(id)).toEqual(room);
    expect(state.users.get(id)).toEqual(user);
    expect(room.has(id)).toBe(true);
  });

  test("join to room by Id", () => {
    const room = state.createRoom(id);

    const user = state.createUser(id);

    user.join(room.id);
    expect(state.rooms.get(id)).toEqual(room);
    expect(state.users.get(id)).toEqual(user);
    expect(room.has(id)).toBe(true);
  });

  test("join to room by Id", () => {
    const room = state.createRoom(id);

    const user = state.createUser(id);

    user.join(room.id);
    expect(state.rooms.get(id)).toEqual(room);
    expect(state.users.get(id)).toEqual(user);
    expect(room.has(id)).toBe(true);
  });
});

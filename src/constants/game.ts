/**
 * @description: game level config
 */
export const gameLevel = {
  easy: {
    rows: 9,
    cols: 9,
    mines: 10,
  },
  medium: {
    rows: 16,
    cols: 16,
    mines: 40,
  },
  hard: {
    rows: 16,
    cols: 30,
    mines: 99,
  },
};

/**
 * @description: mine category
 */
export const mineCategory: MineInfoType[] = [
  {
    name: "mine",
    emoji: "💣",
  },
  {
    name: "bug",
    emoji: "🐞",
  },
  {
    name: "badFace",
    emoji: "🤬",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    type                                    */
/* -------------------------------------------------------------------------- */

export type GameLevelType = keyof typeof gameLevel;

export type MineInfoType = { name: string; emoji: string };

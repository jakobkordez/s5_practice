export function generateRandomCallsign(): string {
  const length = Math.ceil(Math.random() * 3);
  let callsign = `S5${String.fromCharCode(
    Math.floor(Math.random() * 10) + 48,
  )}`;
  for (let i = 0; i < length; i++) {
    callsign += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  return callsign;
}

interface GenerateAllCallsignsOptions {
  exclude?: string[];
  filter?: RegExp;
}

export function generateAllCallsigns({
  exclude,
  filter,
}: GenerateAllCallsignsOptions = {}): string[] {
  const ret: string[] = [];

  const excludeSet = new Set(exclude);

  for (let i = 0; i < 10; ++i) {
    for (let x = 0; x < 26; ++x) {
      const a = `S5${i}${String.fromCharCode(x + 65)}`;
      if (!excludeSet.has(a) && (!filter || filter.test(a))) ret.push(a);

      for (let y = 0; y < 26; ++y) {
        const b = a + String.fromCharCode(y + 65);
        if (!excludeSet.has(b) && (!filter || filter.test(b))) ret.push(b);

        for (let z = 0; z < 26; ++z) {
          const c = b + String.fromCharCode(z + 65);
          if (!excludeSet.has(c) && (!filter || filter.test(c))) ret.push(c);
        }
      }
    }
  }

  return ret;
}

export function levenshteinDistance(from: string, to: string): number {
  const addWeight = 1.6;
  const removeWeight = 0.4;
  const replaceWeight = 1;
  const swapWeight = 0.5;

  from = from.toUpperCase();
  to = to.toUpperCase();

  const table: number[][] = [[]];
  for (let i = 0; i < to.length + 1; i++) table[0][i] = i * addWeight;

  for (let i = 1; i < from.length + 1; i++) {
    const curr: number[] = [];
    curr[0] = i * removeWeight;

    for (let j = 1; j < to.length + 1; j++) {
      const cost =
        from[i - 1] === to[j - 1] || from[i - 1] === '*' ? 0 : replaceWeight;
      curr[j] = Math.min(
        table[i - 1][j] + removeWeight,
        curr[j - 1] + addWeight,
        table[i - 1][j - 1] + cost,
      );
      if (
        i > 1 &&
        j > 1 &&
        from[i - 2] === to[j - 1] &&
        from[i - 1] === to[j - 2]
      ) {
        curr[j] = Math.min(curr[j], table[i - 2][j - 2] + swapWeight);
      }
    }

    table.push(curr);
  }

  return table[from.length][to.length];
}

export function cwWeight(text: string): number {
  text = text.toUpperCase();
  let ret = (text.length - 1) * 3;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      ret += 1;
      continue;
    }

    const cw = cwMap.get(text[i]);
    if (!cw) throw new Error(`No cw for ${text[i]}`);

    ret += cw.length - 1;
    for (let i = 0; i < cw.length; i++) {
      if (cw[i] == '.') ret += 1;
      else ret += 3;
    }
  }

  return ret;
}

const cwMap = new Map<string, string>([
  ['A', '.-'],
  ['B', '-...'],
  ['C', '-.-.'],
  ['D', '-..'],
  ['E', '.'],
  ['F', '..-.'],
  ['G', '--.'],
  ['H', '....'],
  ['I', '..'],
  ['J', '.---'],
  ['K', '-.-'],
  ['L', '.-..'],
  ['M', '--'],
  ['N', '-.'],
  ['O', '---'],
  ['P', '.--.'],
  ['Q', '--.-'],
  ['R', '.-.'],
  ['S', '...'],
  ['T', '-'],
  ['U', '..-'],
  ['V', '...-'],
  ['W', '.--'],
  ['X', '-..-'],
  ['Y', '-.--'],
  ['Z', '--..'],
  ['0', '-----'],
  ['1', '.----'],
  ['2', '..---'],
  ['3', '...--'],
  ['4', '....-'],
  ['5', '.....'],
  ['6', '-....'],
  ['7', '--...'],
  ['8', '---..'],
  ['9', '----.'],
  ['.', '.-.-.-'],
  [',', '--..--'],
  ['?', '..--..'],
  ['/', '-..-.'],
  ['=', '-...-'],
]);

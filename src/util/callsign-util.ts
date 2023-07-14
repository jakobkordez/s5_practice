export function generateRandomCallsign(): string {
  const length = Math.ceil(Math.random() * 3);
  let callsign = `S5${String.fromCharCode(
    Math.floor(Math.random() * 10) + 48
  )}`;
  for (let i = 0; i < length; i++) {
    callsign += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  return callsign;
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
    for (const c in cw) {
      if (cw[c] == '.') ret += 1;
      else ret += 3;
    }
  }

  return ret;
}

const cwMap = new Map<String, String>([
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

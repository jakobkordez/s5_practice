import { NextApiRequest, NextApiResponse } from 'next';

const delta = 1000 * 60 * 60 * 12; // 24 hours in milliseconds

let lastFetch = new Date(0);
let cache: string[] = [];

const akosCsv =
  'https://www.akos-rs.si/?type=1452982642&o=Radioamaterji&no_cache=1&klicni_znak=&razred=&e=csv&order[0][column]=0&order[0][dir]=asc&columns[0][data]=RA_KlicniZnak';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const now = new Date();

  if (now.getTime() - lastFetch.getTime() > delta) {
    // Cache is stale, fetch new data
    const csv = await fetch(akosCsv).then((res) => res.text());
    const lines = csv.trim().split('\n').slice(1);

    cache = lines.map((line) => line.split(',')[0]);
    lastFetch = now;
  }

  res.status(200).json(cache);
}

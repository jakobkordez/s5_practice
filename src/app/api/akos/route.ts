export const revalidate = 60 * 60 * 24; // 24 hours in seconds

const akosCsv =
  'https://www.akos-rs.si/?type=1452982642&o=Radioamaterji&no_cache=1&klicni_znak=&razred=&e=csv&order[0][column]=0&order[0][dir]=asc&columns[0][data]=RA_KlicniZnak';

export async function GET() {
  const csv = await fetch(akosCsv).then((res) => res.text());
  const calls = csv
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => line.split(',')[0]);

  return Response.json(calls);
}

import Link from 'next/link';

const povezave = [
  {
    label: 'Priročnik za radioamaterje (3. izdaja)',
    href: 'http://www.homemade.net/ra/prirocnik_novi.pdf',
  },
  {
    label: 'Priročnik za radioamaterje (2. izdaja)',
    href: 'https://www.radioamater.si/wp-content/uploads/2016/01/prirocnik-za-radioamaterje_2izd.pdf',
  },
  {
    label: 'Etika in operaterski postopki',
    href: 'http://www.hamradio.si/images/dokumenti/publikacije/etika_junij%202021.pdf',
  },
  {
    label: 'Izpitni roki ZRS',
    href: 'http://www.hamradio.si/index.php?option=com_content&view=article&id=677&Itemid=118',
  },
  {
    label: 'Kriteriji za izpit',
    href: 'https://zrs.si/files/kriteriji.pdf',
  },
  {
    label: 'Seznam zasedenih klicnih znakov',
    href: 'https://www.akos-rs.si/registri/seznam-registrov/radioamaterji',
  },
];

export default function Home() {
  return (
    <div className="section content">
      <h1>Pozdravljen!</h1>
      <p>
        Na podstrani <Link href="/priprave">Priprave</Link> so vaje za pripravo
        na izpit. Vprašanja so razdeljena po kategorijah, pravilni odgovori pa
        se razkrivajo sproti.
      </p>

      <p>
        Na podstrani <Link href="/izpit-sim">Simulator izpita</Link> lahko
        preizkusiš svoje znanje. Vprašanja so generirana kot bi bila na
        resničnem izpitu. Pravilni odgovori se razkrijejo šele po koncu.
      </p>

      <h2>Uporabne povezave</h2>
      <ul className="list-inside list-disc">
        {povezave.map(({ label, href }) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

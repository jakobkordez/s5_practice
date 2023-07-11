import Link from 'next/link';

const povezave = [
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
    <>
      <div className="w-full bg-dark text-darker">
        <div className="container flex flex-col gap-6 py-6">
          <div className="flex flex-col gap-6 text-xl font-bold md:flex-row">
            <Link
              href="/zbirka"
              className="grow rounded-2xl bg-white/90 p-4 text-center shadow"
            >
              Zbirka vprašanj
            </Link>
            <Link
              href="/priprave"
              className="grow rounded-2xl bg-white/90 p-4 text-center shadow"
            >
              Vadi vprašanja
            </Link>
            <Link
              href="/izpit-sim"
              className="grow rounded-2xl bg-white/90 p-4 text-center shadow"
            >
              Reši preizkusni izpit
            </Link>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-10 py-10">
        <div>
          <h3 className="mb-3 text-3xl font-semibold">
            Kaj je radioamaterstvo?
          </h3>
          <p>.... --- .-- / ... .... --- ..- .-.. -.. / .. / -.- -. --- .--</p>
        </div>

        <div>
          <h3 className="mb-3 text-3xl font-semibold">
            Katera kategorija je prava zame?
          </h3>
          <p>IDK. N alpa A.</p>
        </div>

        <div>
          <h3 className="mb-3 text-3xl font-semibold">Kaj povzema izpit?</h3>
          <p>Na izpitu se preverja znanje iz naslednjih področij:</p>
          <ul className="list-inside list-disc">
            <li>Zgodovina, razvoj in pomen radioamaterstva</li>
            <li>Osnovni pojmi o radijskih kominikacijah</li>
            <li>Predpisi za amaterske radijske komunikacije</li>
            <li>Pravila in praksa v amaterskih radijskih komunikacijah</li>
            <li>Elektrotehnika</li>
            <li>Radiotehnika</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-3xl font-semibold">
            Preizkus znanja morzejevih znakov
          </h3>
          <p>.. -.. -.-</p>
        </div>

        <div>
          <h3 className="mb-3 text-3xl font-semibold">
            Vsebine za pripravo na izpit
          </h3>
          <p>
            Vsa snov, ki se lahko pojavi v izpitnih vprašanjih je vsebovana v{' '}
            <a
              className="link"
              href="http://www.homemade.net/ra/prirocnik_novi.pdf"
            >
              Priročniku za radioamaterje (3. izdaja)
            </a>
            . V 3. izdaji je bilo najdenih že nekaj napak in predvsem mankajoče
            poglavje o detektorjih, zato je bolj priporočljiva{' '}
            <a
              className="link"
              href="https://www.radioamater.si/wp-content/uploads/2016/01/prirocnik-za-radioamaterje_2izd.pdf"
            >
              2. izdaja priročnika
            </a>
            .
          </p>
          <p>
            Če ti je branje priročnika preveč dolgočasno, si lahko pomagaš s
            prosojnicami, ki jih pripravljajo v radioklubih, ki izvajajo tečaje.
            Seveda pa je na internetu na voljo tudi veliko drugih gradiv, ki so
            lahko v pomoč pri učenju.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-3xl font-semibold">Vaja pred izpitom</h3>
          <p>
            Pred izpitom si lahko ogledaš{' '}
            <a className="link" href="/zbirka">
              zbirko vprašanj
            </a>
            , ki se lahko pojavijo na izpitu
          </p>
          <p>
            Nato si lahko tudi pomagaš s sistemom za{' '}
            <a className="link" href="/priprava">
              vajo vprašanj
            </a>
            .
          </p>
          <p>
            Lahko pa tudi poskusiš{' '}
            <a className="link" href="/izpit-sim">
              rešiti preizkusni test
            </a>
            , da oceniš svoje znanje.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-3xl font-semibold">Uporabne povezave</h3>
          <ul className="list-inside list-disc">
            {povezave.map(({ label, href }) => (
              <li key={label}>
                <Link className="link" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

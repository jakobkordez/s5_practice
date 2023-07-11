import Link from 'next/link';

const povezave = [
  {
    label:
      'Priročnik za radioamaterje (3. izdaja - vsebuje napake in mankajo vsebine)',
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
    <>
      <div className="w-full bg-dark text-darker">
        <div className="container flex flex-col gap-6 py-6">
          <div className="flex flex-col gap-6 text-xl font-bold md:flex-row">
            <Link
              href="#kako-zaceti"
              className="grow rounded-2xl bg-white/90 p-4 text-center shadow"
            >
              Seznam vprašanj
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
          <h3 className="mb-3 text-2xl font-bold">Kaj je radioamaterstvo?</h3>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold">
            Katera kategorija je prava zame?
          </h3>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold">Kaj povzema izpit?</h3>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold">Kako začeti?</h3>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold">
            Vsebine za pripravo na izpit
          </h3>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold">Vaja pred izpitom</h3>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold">Uporabne povezave</h3>
          <ul className="list-inside list-disc">
            {povezave.map(({ label, href }) => (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";

const uporabne_povezave = [
  {
    label: "Priročnik za radioamaterje",
    href: "http://www.homemade.net/ra/prirocnik_novi.pdf",
  },
  {
    label: "Etika in operaterski postopki",
    href: "http://www.hamradio.si/images/dokumenti/publikacije/etika_junij%202021.pdf",
  },
  {
    label: "Izpitni roki ZRS",
    href: "http://www.hamradio.si/index.php?option=com_content&view=article&id=677&Itemid=118",
  },
  {
    label: "Seznam zasedenih klicnih znakov",
    href: "https://www.akos-rs.si/registri/seznam-registrov/radioamaterji",
  },
  {
    label: "Kriteriji za izpit",
    href: "https://zrs.si/files/kriteriji.pdf",
  },
];

export default function Home() {
  return (
    <div className="section content">
      <h1>Pozdravljen!</h1>
      <p>
        Ta spletna stran je namenjena pripravi na radioamaterski izpit. Na njej
        najdete vse potrebne informacije, ki jih potrebujete za pripravo na
        izpit. Vsebina je zasnovana tako, da je lahko dostopna tudi za
        neizkušene radioamaterje.
      </p>

      <h2>Kaj je radioamaterski izpit?</h2>
      <p>
        Radioamaterski izpit je izpit, ki ga mora opraviti vsak, ki želi postati
        radioamater. Izpit je sestavljen iz dveh delov: teoretičnega in
        praktičnega dela. Teoretični del izpita je sestavljen iz 50 vprašanj, od
        katerih je potrebno odgovoriti na 40 pravilno. Praktični del izpita pa
        je sestavljen iz 3 delov: izdelava antene, izdelava sprejemnika in
        izdelava oddajnika. Vse tri naloge mora opraviti v 30 minutah.
      </p>

      <h2>Uporabne povezave</h2>
      <ul className="list-inside list-disc">
        {uporabne_povezave.map(({ label, href }) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

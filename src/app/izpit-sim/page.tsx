import { Metadata } from "next";
import IzpitQuiz from "./izpit-quiz";

export const metadata: Metadata = {
  title: "Simulator izpita",
  description: "Pripomoček za simuliranje izpita za radioamaterski izpit",
};

export default function Priprave() {
  return (
    <div className="section">
      <div className="content">
        <h1>Simulator izpita</h1>

        <p>
          Kandidati za radioamaterja razreda A opravljajo izpit, ki je
          sestavljen iz <strong>60 različnih vprašanj</strong>. Vsako vprašanje
          ima 3 možne odgovore, od katerih je samo en pravilen. Kandidat ima na
          voljo 90 minut za reševanje izpitne pole. Kandidat mora{" "}
          <strong>pravilno odgovoriti vsaj na 36 vprašanj</strong> (60 %) .
        </p>
      </div>

      <IzpitQuiz />
    </div>
  );
}

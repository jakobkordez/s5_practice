import { Metadata } from "next";
import VajaQuiz from "./vaja-quiz";

export const metadata: Metadata = {
  title: "Priprave na izpit",
};

export default function Priprave() {
  return (
    <div className="section">
      <div className="content">
        <h1>Priprave na izpit</h1>
      </div>

      <VajaQuiz />
    </div>
  );
}

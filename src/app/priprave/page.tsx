import Quiz from "@/components/quiz";
import { Category } from "@/interfaces/category";
import { Question } from "@/interfaces/question";

interface QuizStore {
  isLoading: boolean;

  categories: Category[];
  selectedCategory: string;

  questions: Question[];
  answers: number[][];
  displayed: number;
  loadMore: () => void;
}

export default function Priprave() {
  return (
    <div className="section">
      <div className="content mb-6">
        <h1>Priprave na izpit</h1>
        <p>
          Priprave na radioamaterski izpit so namenjene vsem, ki želijo postati
          radioamaterji. Priprave so brezplačne in potekajo v prostorih Zveze
          radioamaterjev Slovenije (ZRS) v Ljubljani. Priprave so namenjene tudi
          tistim, ki so že opravili izpit, vendar se želijo pripraviti na
          nadaljnje izpite.
        </p>
      </div>

      <Quiz />
    </div>
  );
}

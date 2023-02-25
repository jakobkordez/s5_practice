import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";

interface ExamHeaderProps {
  op_class: string;
  num_questions: number;
  num_options: number;
  pass_threshold: number;
  time: number;
}

export default function ExamHeader({
  op_class,
  num_questions,
  num_options,
  pass_threshold,
  time,
}: ExamHeaderProps) {
  const options = "ABCDEFGH".split("").slice(0, num_options).join(", ");

  return (
    <View style={styles.all}>
      <View style={styles.header}>
        <Image
          src="/logo/zrs_logo_black_small.png"
          style={{ height: "108px", width: "96px" }}
        />
        <View style={styles.title}>
          <Text>IZPITNA POLA ZA AMATERSKE</Text>
          <Text>
            OPERATERJE <Text style={styles.bold}>{op_class}</Text> RAZREDA
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.input}>
          <Text>Ime in priimek:</Text>
          <View style={styles.inputLine} />
        </View>
        <View style={styles.input}>
          <Text>Datum in kraj rojstva:</Text>
          <View style={styles.inputLine} />
        </View>
        <View style={styles.input}>
          <Text>Stalno prebivališče:</Text>
          <View style={styles.inputLine} />
        </View>
        <View style={styles.input}>
          <Text>Član-ica radiokluba:</Text>
          <View style={styles.inputLine} />
        </View>
      </View>

      <View>
        <Text>
          Izjavljam, da sem izpitno polo izpolnil-a lastnoročno in pri tem nisem
          uporabljal-a nedovoljenih načinov reševanja.
        </Text>

        <View style={styles.izjava}>
          <View style={styles.izjavaField}>
            <Text>Kraj:</Text>
            <View style={styles.izjavaLine} />
          </View>
          <View style={styles.izjavaField}>
            <Text>Datum:</Text>
            <View style={styles.izjavaLine} />
          </View>
          <View style={styles.izjavaField}>
            <Text>Podpis:</Text>
            <View style={styles.izjavaLine} />
          </View>
        </View>
      </View>

      <View style={styles.komisija}>
        <Text style={styles.bold}>Ocena izpitne komisije:</Text>
        <Text>
          Kandidat-ka je pravilno odgovoril-a na _______ / {num_questions}{" "}
          vprašanj in JE - NI uspešno opravil-a izpit za radioamaterja{" "}
          {op_class} razreda.
        </Text>
        <View style={styles.izjavaField}>
          <Text>Podpis člana komisije:</Text>
          <View style={styles.izjavaLine} />
        </View>
      </View>

      <Text>
        Prag za uspešno opravljen izpit je {pass_threshold} pravilnih odgovorov.
        Za reševanje izpitne pole je na voljo {time} minut.
      </Text>

      <Text>
        <Text>Navodilo:</Text> Pri vprašanjih obkroži ustrezno črko ({options})
        pred pravilnim odgovorom. Če popravljaš odgovor, se pri popravku
        podpiši, napačen odgovor pa v celoti prečrtaj.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  all: {
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  komisija: {
    border: "1px solid black",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    fontSize: "20px",
  },
  bold: {
    fontWeight: "bold",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10px",
  },
  inputLine: {
    flexGrow: 1,
    borderBottom: "1px solid black",
    height: "25px",
  },
  izjava: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  izjavaField: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  izjavaLine: {
    flexGrow: 1,
    borderBottom: "1px solid black",
    height: "25px",
  },
});

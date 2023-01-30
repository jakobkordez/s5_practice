import json
import base64

def gen_vprasanje(ime, vprasanje, odgovori, pravilen , slika = None):
    k = doloci_kategorijo(ime)
    c = f"""<question type="category">
    <category>
      <text>$course$/top/{k}</text>
    </category>
    </question>
    """
    
    if(slika != None and k != "Risanje"):
        with open(f"assets/images/{slika}", "rb") as image_file:
            vprasanje += f"<br><img src=\"data:image/png;base64, {str(base64.b64encode(image_file.read()))[2:-1]}\"/>"

    ans = ""
    if(odgovori != None):
        for o in range(len(odgovori)):
            p = 0
            if(o == pravilen):
                p = 100
            ans += f"""<answer fraction="{p}" format="html">
            <text><![CDATA[{odgovori[o]}]]></text>
        </answer>
        """
    
        return f"""{c}<question type="multichoice">
        <name>
        <text>{ime}</text>
        </name>
        <questiontext format="html">
        <text><![CDATA[{vprasanje}]]></text>
        </questiontext>
        <answernumbering>none</answernumbering>
        {ans}
        </question>
        """
    else:
        return f"""{c}<question type="essay">
        <name>
        <text>{ime}</text>
        </name>
        <questiontext format="html">
        <text><![CDATA[{vprasanje}<br>Za lažje ocenjevanje, v polje vpišite neko besedilo.]]></text>
        </questiontext>
        <responseformat>monospaced</responseformat>
        <responserequired>1</responserequired>
        <responsefieldlines>2</responsefieldlines>
        <attachments>0</attachments>
        </question>"""

def doloci_kategorijo(stevilka):
    global cat
    for c in cat:
        for q in c["questions"]:
            if q[0] <= stevilka and stevilka <= q[1]:
                return c["title"]

f = open("assets/questions.json")
b = json.load(f)

q = b["questions"]
cat = b["categories"]

f = open("radioamaterstvo.xml", "w")
f.write("""<?xml version="1.0" encoding="UTF-8"?><quiz>""")
for qu in q:
    f.write(gen_vprasanje(qu["id"], qu["question"], qu["answers"], qu["correct"], qu["image"]))
f.write("""</quiz>""")
f.close()

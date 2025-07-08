from bs4 import BeautifulSoup

# Abra o HTML salvo manualmente
with open("curriculo.html", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# Exemplo: pegar todos os títulos de artigos completos
for item in soup.find_all("span", class_="titulo-artigo-completo"):
    print(item.text.strip())

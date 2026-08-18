---
name: murilo-prova
description: >
  Framework para montar SIMULADOS e PROVAS de inglês no formato escolar brasileiro
  (aluno ~12 anos, nível B1), fiel aos modelos de referência do projeto. Os modelos
  combinam questões de múltipla escolha nomeadas "Questão N" com tarefas numeradas
  (1., 2., 3. ...) de produção/preenchimento que carregam o valor em (0,X),
  além de seções de leitura em caixa ("Texto base N" / "READING").
  Use SEMPRE que o usuário pedir para "criar uma prova", "montar um simulado",
  "gerar uma avaliação de inglês", "fazer uma prova como os modelos",
  "elaborar teste de gramática/vocabulário", ou qualquer variação.
  Esta skill contém APENAS a moldura estrutural (numeração, pontuação, tipos de
  questão, formatação, rodapé, gabarito). O CONTEÚDO (gramática, vocabulário,
  textos) é sempre fornecido pelo usuário a cada uso — nunca inventar tópico
  fora do que o usuário enviar.
---

# 📝 SKILL — English Test Framework (Provas / Simulados escolares)

Framework de montagem de provas de inglês, extraído dos modelos de referência do projeto.
**Esta skill descreve o FORMATO, não o conteúdo.** O conteúdo (tema gramatical, vocabulário,
textos de leitura) é inserido pelo usuário a cada prova. Todos os marcadores `[INSERIR ...]`
indicam onde o conteúdo entra.

---

## 1. 🎬 Fluxo de Interação (obrigatório)

1. **Aguardar** o usuário enviar o CONTEÚDO da matéria (tópicos gramaticais, lista de vocabulário, texto de leitura). Não gerar nada antes.
2. **Confirmar** em 1–2 linhas o que foi recebido (ex.: "Recebido: Past Simple + adjetivos de sentimento + texto de leitura").
3. **Perguntar apenas o que faltar** para montar o simulado (botões ajudam): número de questões desejado, se inclui leitura, formato de saída.
4. **Gerar o simulado COMPLETO** seguindo a moldura abaixo.
5. **Gerar o GABARITO separado** ao final, com resposta modelo e critério de aceitação.

> ❗ **Regra de ouro:** nunca inventar conteúdo fora do que o usuário forneceu.
> Se faltar conteúdo para algum tipo de questão, perguntar — não completar por conta própria.

---

## 2. 👤 Perfil-alvo (fixo do projeto)

- **Idade:** ~12 anos
- **Nível:** B1 (intermediário)
- **Língua-alvo:** inglês
- **Língua das instruções-meta:** português (comandos de navegação da prova)
- **Tom:** claro, direto, enunciados curtos

---

## 3. 🏗️ Estrutura Geral (imitar os modelos)

- A prova é **um documento contínuo** que mistura as duas numerações na mesma página:
  - **`Questão N`** → questões de **múltipla escolha** (ex.: Questão 1 … Questão 12).
  - **`1.`, `2.`, `3.` …** → tarefas de **produção / preenchimento / rewrite / escrita**.
- **Valores:** cada **tarefa numerada** é precedida do valor impresso `(0,X)` na mesma
  linha ou logo acima (padrão dos modelos: `(0,4)`, `(0,3)`, `(0,8)`).
  - As questões de **múltipla escolha ("Questão N") não têm valor impresso** nos modelos;
    o professor distribui o peso delas até o total de 10,0.
  - **Total da prova = 10,0** (notação brasileira com vírgula).
- Alternativas sempre `a) b) c) d)`, uma linha por opção.
- Textos de leitura com cabeçalho próprio dentro de **caixa com borda**:
  - **`Texto base N`** → leitura curta com múltipla escolha logo depois.
  - **`READING`** → seção de leitura mais longa (às vezes com vários sub-textos).
- No modelo, a ordem é: **Questões 1–9** (M.E. de gramática/vocabulário) → **tarefas 1.–7.**
  → **Texto base 1** com **Questões 10–12**. A ordem exata é flexível.

**Esqueleto de saída:**

```
[CABEÇALHO DA PROVA — escola / disciplina / turma / nome / data / nota — INSERIR]


Questão N
[ENUNCIADO MÚLTIPLA ESCOLHA]
a) [opção]
b) [opção]
c) [opção]
d) [opção]


... (mais Questões e tarefas intercaladas)


(0,X)
1. [ENUNCIADO DA TAREFA + itens a) b) ...]


(0,X)
2. [ENUNCIADO + itens]


...


Texto base N
┌──────────────────────────────┐
│ [TÍTULO DO TEXTO]             │
│ [1º PARÁGRAFO]                │
│ [2º PARÁGRAFO]                │
│ [3º PARÁGRAFO]                │
└──────────────────────────────┘


Questão N
PARA RESPONDER À QUESTÃO, LEIA O TEXTO BASE N
[PERGUNTA SOBRE UM PARÁGRAFO]?
a) [opção]
b) [opção]
c) [opção]
d) [opção]


[RODAPÉ: códigos BNCC + critérios de correção — INSERIR]
```

---

## 4. 🧩 Catálogo de Tipos — Múltipla escolha (`Questão N`)

Variações que aparecem nos modelos de referência (usar conforme o conteúdo enviado):

### 4.1 Sequência correta de sentimentos
> *Choose the correct sequence of feelings for the situations below: What are they feeling?*

```
[situação 1]
[situação 2]
[situação 3]
[situação 4]
[situação 5]
a) relaxed - scared - tired - excited - worried
b) worried - embarrassed - bored - annoyed - relaxed
c) surprised - bored - scared - excited - embarrassed
d) relaxed - scared - bored - worried - excited
```
- Cada opção tem a mesma quantidade de sentimentos que de situações, na ordem.

### 4.2 Sinônimos na ordem (a partir de diálogo/texto)
> *Read the dialogue. Then choose the option with words that have the same meaning as the words in bold, in the same order.*

```
[DIÁLOGO OU TEXTO COM PALAVRAS EM NEGRITO]
( [palavras-alvo, na ordem em que aparecem] )
a) [sinônimos na ordem]
b) [sinônimos trocados]
c) [sinônimos trocados]
d) [sinônimos trocados]
```
- Os sinônimos das alternativas seguem EXATAMENTE a ordem das palavras-alvo.

### 4.3 Função / tempo dos verbos
> *Read the text. The verbs "[verbo1]", "[verbo2]" ... are used to:*

```
[FRASE CURTA COM VERBOS EM DESTAQUE]
a) talk about future plans
b) describe actions happening now
c) describe actions in the past
d) give instructions
```

### 4.4 Identificar tempo verbal (com GLOSSARY)
> *The underlined verbs in the text are all in the:*

```
[TEXTO CURTO com verbos grifados/sublinhados]
GLOSSARY
[termo] - [tradução]
...
a) Present Continuous
b) Past Continuous
c) Past Simple
d) Present Simple
```

### 4.5 "Choose the correct sentence."
> *Choose the correct sentence.*

```
a) [frase incorreta]
b) [frase correta]
c) [frase incorreta]
d) [frase incorreta]
```

### 4.6 Combinação de frases corretas
> *Choose the grammatically correct sentences:*

```
1. [frase 1]
2. [frase 2]
3. [frase 3]
4. [frase 4]
a) 1,4
b) 1,2
c) 2,3
d) 3,4
```

### 4.7 Preenchimento de gaps + escolha da combinação
Questão de prova externa (ex.: ESA) com texto com gaps e verbos entre parênteses;
as opções trazem a sequência completa de respostas:

```
Questão N *(origem opcional — ex.: ESA-2024)*
Read the text. Use the verbs in brackets in the [TEMPO] to complete the sentences,
then choose the corresponding alternative:
[TEXTO COM GAPS ___ (verbo), ___ (verbo) ...]
a) [sequência de verbos]
b) [sequência de verbos]
c) [sequência de verbos]
d) [sequência de verbos]
```

### 4.8 Uso de conectivos (when / while)
> *Which sentence correctly uses "when" and "while"?*

```
a) [frase incorreta]
b) [frase incorreta]
c) [frase correta]
d) [frase incorreta]
```

### 4.9 Frase correta (pergunta)
> *[CONTEXTO]. Choose the correct sentence:*

```
a) [pergunta incorreta]
b) [pergunta incorreta]
c) [pergunta incorreta]
d) [pergunta correta]
```

### 4.10 Compreensão leitora — múltipla escolha
Depois de um texto em caixa, cada Questão traz a instrução de navegação em CAIXA ALTA
e pergunta sobre um parágrafo específico:

```
Questão N
PARA RESPONDER À QUESTÃO, LEIA O TEXTO BASE N
[PERGUNTA SOBRE UM PARÁGRAFO ESPECÍFICO]?
a) [opção]
b) [opção]
c) [opção]
d) [opção]
```
- Padrão dos modelos: uma pergunta por parágrafo do texto ("According to the
  first/second/third paragraph, ...").

---

## 5. 🧩 Catálogo de Tipos — Tarefas numeradas (com valor)

Cada tarefa começa com o valor `(0,X)` seguido do número (`1.`, `2.` ...):

### 5.1 Fill in the blank — verbo entre parênteses `(0,4)`
> *Complete the sentences with the appropriate positive or negative past simple form of the verbs in brackets.*

```
a) [FRASE COM GAP ___] ([verbo]) [complemento].
b) [FRASE COM GAP ___] ([verbo]) ...
```
- Gap `___` sempre visível; verbo-base entre parênteses ao lado do gap.
- Misturar frases positivas e negativas.

### 5.2 Completar com *be* / *there was–were* `(0,3)`
> *Complete the sentences with the correct past form of be or there was/were.*

```
a) [FRASE ___ complemento].
b) ___ [complemento].
c) ___ [complemento]? (pergunta)
d) "___ ?" "No, she ___." (diálogo)
e) There ___ [complemento]. (negativa)
f) "___ ?" "Yes, there ___." (diálogo)
```
- Misturar afirmativa, negativa, interrogativa e diálogos curtos.

### 5.3 Completar e-mail / texto com verbos `(0,4)`
> *Complete the [email/text] with the past simple form of the verbs in brackets.*

```
[TEXTO CORRIDO COM GAPS NUMERADOS 1 ___ (verbo), 2 ___ (verbo) ...]
```
- Gaps numerados dentro do texto; verbo-base entre parênteses.
- E-mail termina com despedida e nome (ex.: "See you next week, [nome]").

### 5.4 Rewrite — afirmativa / negativa / interrogativa `(0,5)`
> *Rewrite the sentences using the past simple affirmative (✓), negative (X) or question (?) form.*

```
Example: [FRASE]. X → [REESCRITA MODELO].

a) [FRASE]. (✓)
   ________________________________
b) [FRASE]. (X)
   ________________________________
c) [FRASE]. (?)
   ________________________________
```
- Sempre incluir 1 exemplo resolvido no enunciado.
- Linha em branco para o aluno reescrever.
- Cada frase recebe um marcador: ✓, X ou ?.

### 5.5 Escrita a partir de imagem `(0,3)`
> *Look at the picture. What were the people doing [no local]? Write [N] sentences using the [TEMPO].*

```
[INSERIR IMAGEM]
1. ______________________________
2. ______________________________
3. ______________________________
```

### 5.6 Completar adjetivos / vocabulário `(0,3)`
> *Complete the adjectives in the sentences.*

```
Example: Look! There's a shark in the sea. I'm scared!

a) [FRASE COM GAP ___]. [inicial da palavra] ______
b) [FRASE COM GAP ___]. [inicial] ______
```
- Dar a **letra inicial** do alvo como pista (padrão dos modelos: `e___`, `t___`, `s___`, `r___`).
- Sempre incluir 1 exemplo resolvido no enunciado.

### 5.7 Compreensão leitora — resposta aberta `(0,8)`
```
READING
┌──────────────────────────────┐
│ [TEXTO COM VÁRIOS SUB-TEXTOS]│
│ (cada sub-texto com título)  │
└──────────────────────────────┘


(0,8)
N. Read the article to answer the following [X] questions:
a) [PERGUNTA ABERTA]?
   ________________________________
b) [PERGUNTA ABERTA]?
   ________________________________
c) [PERGUNTA ABERTA]?
   ________________________________
d) [PERGUNTA ABERTA]?
   ________________________________
```
- Perguntas abertas sobre informações específicas do texto.

---

## 6. 📐 Padrões de Formatação

- **Valor da tarefa** sempre em `(0,X)` com **vírgula** (padrão BR: `0,4`), logo antes do
  número da tarefa.
- **Numeração:** tarefas de produção `1.`, `2.`, `3.` … ; múltipla escolha sempre como
  **"Questão N"**. As duas convenções coexistem no mesmo documento (imitar modelos).
- **Instruções da questão** em inglês, curtas; **instruções-meta de navegação** em
  **CAIXA ALTA** português (`PARA RESPONDER À QUESTÃO, LEIA O TEXTO BASE N`).
- **Gaps** = `___` visível; comprimento proporcional (palavra → `___`, expressão → `______`).
  - ⚠️ Se a saída for **Notion**, envolver gaps em crase → `` `______` `` (o parser do
    Notion apaga underscores soltos).
- **Textos de leitura** dentro de caixa com borda + título próprio + cabeçalho
  (`Texto base N` ou `READING`).
- **Exemplos resolvidos** no enunciado quando o tipo exigir (rewrite, adjetivos).
- **Nunca** deixar frase de fill-in sem gap (frase completa = inválida).
- Origem de prova externa indicada entre parênteses após o número (ex.: `Questão 7 (ESA-2024)`).
- Alternativas de múltipla escolha: uma por linha, `a) b) c) d)`.

---

## 7. 🦶 Rodapé da Prova (padrão dos modelos)

Incluir ao final, imitando os modelos de referência:

- **Habilidades BNCC** (códigos): `[INSERIR CÓDIGOS — ex.: EF07LI17, EF07LI07, EF07LP34]`
  - Não inventar códigos; usar os que o usuário indicar ou deixar placeholder para ele preencher.
- **Critérios de correção / Motivo do desconto:**
  - `[INSERIR REGRA — ex.: "Limite máximo de erros = 0,3"; "domínio da modalidade escrita"]`

---

## 8. ✅ Gabarito (documento separado)

Gerar **após** a prova, em bloco/arquivo próprio, na mesma numeração:
```
GABARITO
1. a) [resposta]  b) [resposta] ...
2. ...
Questão N — [alternativa correta]
```
- Questões abertas (compreensão / escrita): fornecer **resposta modelo** + critério de aceitação.
- Conferir que a **soma dos pontos = 10,0** (valores das tarefas + peso das Questões de
  múltipla escolha, distribuído pelo professor).

---

## 9. 🎨 Formatos de Saída Suportados

Perguntar ou inferir o formato desejado:
- **Word (.docx)** → prova impressa (usar a skill `docx`).
- **HTML/JS single-file** → prova digital interativa autocorretiva (feedback instantâneo;
  opcional correção por IA para respostas abertas).
- **Notion** → página de prova (lembrar da regra dos gaps em crase).
- **Markdown / inline** → rascunho rápido no chat.

---

## 10. 🚫 O que NÃO fazer

- ❌ Não inventar conteúdo fora do que o usuário enviou.
- ❌ Não gerar a prova antes de receber o conteúdo.
- ❌ Não deixar a soma dos pontos diferente de 10,0.
- ❌ Não deixar fill-in sem gap visível.
- ❌ Não misturar idioma-alvo (conteúdo sempre em inglês; só a navegação em português).
- ❌ Não inventar códigos BNCC — usar os do usuário ou placeholder.
- ❌ Não usar vírgula/ponto trocados na pontuação (padrão BR = vírgula: `0,4`).

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Assistente() {
  const [mensagens, setMensagens] = useState([
    {
      remetente: "bot",
      texto:
        "Olá! Eu sou seu assistente financeiro. No que posso te ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");

  const respostas = (pergunta) => {
    const texto = pergunta.toLowerCase();

    if (texto.includes("tempo")) {
      return "⏳ **Tempo:** O tempo depende da sua renda desejada, aporte mensal e perfil de investidor. Confira na Análise ou simule novamente para detalhes.";
    }

    if (
      texto.includes("perfil") ||
      texto.includes("conservador") ||
      texto.includes("moderado") ||
      texto.includes("arrojado")
    ) {
      return `🛡️ **Conservador:** Segurança, foco em renda fixa.\n⚖️ **Moderado:** Equilíbrio entre segurança e crescimento.\n🚀 **Arrojado:** Busca máxima rentabilidade, aceitando mais riscos.`;
    }

    if (texto.includes("aporte")) {
      return "💸 **Aporte:** Quanto maior o valor que você investe mensalmente, mais rápido você atinge seu objetivo financeiro!";
    }

    if (
      texto.includes("renda passiva") ||
      texto.includes("passiva") ||
      texto.includes("renda recorrente")
    ) {
      return "💸 **Renda Passiva:** É o dinheiro que você recebe sem trabalhar ativamente. Pode vir de dividendos, fundos imobiliários, juros e investimentos.";
    }

    if (
      texto.includes("renda fixa") ||
      texto.includes("tesouro direto") ||
      texto.includes("cdb") ||
      texto.includes("prefixado") ||
      texto.includes("pós-fixado")
    ) {
      return `💵 **Renda Fixa:** Investimentos seguros e previsíveis.\n- **Tesouro Direto:** Títulos do governo.\n- **Prefixado:** Você já sabe quanto irá receber no vencimento.\n- **Pós-fixado:** Atrelado a indicadores como Selic ou CDI.\n- **IPCA+:** Protege contra inflação, oferecendo IPCA + taxa fixa.\n- **CDB:** Você empresta dinheiro ao banco e, em troca, recebe uma remuneração na forma de juros. \n **Tesouro Selic:** É um investimento de renda fixa com alta liquidez, considerado um dos mais seguros do mercado.`;
    }

    if (
      texto.includes("renda variável") ||
      texto.includes("bolsa")
    ) {
      return "📈 **Renda Variável:** Ativos que não possuem rentabilidade garantida, como **Ações**, **Fundos Imobiliários** e **Criptomoedas**. Podem gerar maiores ganhos, mas também possuem mais riscos.";
    }

    if (
      texto.includes("inflação")
    ) {
      return "📈 **Inflação:** Aumento generalizado e persistente dos preços de bens e serviços em uma economia ao longo do tempo. Isso significa que, com o tempo, a mesma quantidade de dinheiro compra menos produtos e serviços, ou seja, o poder de compra da moeda diminui.";
    }


    if (
      texto.includes("ação") ||
      texto.includes("ações")
    ) {
      return "📈 **Ações:** São como pedaços de uma empresa que você pode comprar e vender na bolsa de valores, tornando-o um sócio e participante dos seus lucros.";
    }

    if (
      texto.includes("fundo imobiliário") ||
      texto.includes("fundos imobiliários") ||
      texto.includes("fii")
    ) {
      return "🏢 **Fundos Imobiliários (FIIs):** Investimentos em imóveis ou títulos ligados ao setor imobiliário que pagam rendimentos mensais. Excelente para quem busca **Renda Passiva**.";
    }

    if (texto.includes("selic")) {
      return "📊 **Selic:** É a taxa básica de juros da economia brasileira. Afeta diretamente investimentos em renda fixa, como **Tesouro Selic**, e influencia empréstimos e financiamentos.";
    }

    if (texto.includes("ipca")) {
      return "📈 **IPCA:** É o índice que mede a inflação no Brasil. Investimentos atrelados ao IPCA, como **Tesouro IPCA+**, garantem que seu dinheiro mantenha o poder de compra.";
    }

    if (texto.includes("criptomoeda") || texto.includes("bitcoin")) {
      return "🌐 **Criptomoedas:** Ativos digitais descentralizados, como o **Bitcoin**. São voláteis, mas podem oferecer grandes oportunidades para investidores mais arrojados.";
    }

    if (texto.includes("juros compostos")) {
      return "📈 **Juros Compostos:** É o famoso 'juros sobre juros'. Seu dinheiro rende sobre o valor investido mais os rendimentos acumulados, acelerando seu crescimento financeiro.";
    }

    if (
      texto.includes("como funciona") ||
      texto.includes("explica") ||
      texto.includes("simulador")
    ) {
      return "🧠 **Funcionamento:** Você informa sua **renda passiva desejada**, seu **perfil** e o **aporte mensal**. O simulador calcula o **patrimônio necessário**, o **tempo estimado** e sugere uma **distribuição de investimentos**.";
    }

    return "❌ Desculpe, não entendi muito bem. Tente perguntar sobre: **Renda Fixa**, **Renda Variável**, **Tesouro Direto**, **Selic**, **IPCA**, **Fundos Imobiliários**, **Ações** ou **Renda Passiva**.";
  };

  const enviarMensagem = (textoInput) => {
    if (!textoInput) return;
    const novaMensagem = { remetente: "usuario", texto: textoInput };
    const respostaBot = { remetente: "bot", texto: respostas(textoInput) };

    setMensagens((prev) => [...prev, novaMensagem, respostaBot]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      enviarMensagem(input);
    }
  };

  const sugestões = [
    "Renda Passiva",
    "Renda Fixa",
    "Renda Variável",
    "Selic",
    "Ações",
    "FIIs",
    "IPCA"
  ];

  const renderTextoComNegrito = (texto) => {
    return texto.split("\n").map((linha, i) => (
      <p key={i} className="whitespace-pre-wrap">
        {linha.split(/(\*\*.*?\*\*)/g).map((parte, j) => {
          if (parte.startsWith("**") && parte.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold">
                {parte.slice(2, -2)}
              </strong>
            );
          }
          return parte;
        })}
      </p>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] text-center mb-8">
          🤖 Assistente Inteligente
        </h1>

        <Card className="max-w-3xl mx-auto flex flex-col gap-4 p-6">

          <div className="flex flex-col gap-3 h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-white">
            {mensagens.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-4 py-2 rounded-xl ${msg.remetente === "bot"
                    ? "bg-[#22C55E] text-white self-start"
                    : "bg-gray-200 text-gray-800 self-end"
                  }`}
              >
                {renderTextoComNegrito(msg.texto)}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {sugestões.map((sug) => (
              <Button
                key={sug}
                variant="outline"
                onClick={() => enviarMensagem(sug)}
              >
                {sug}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={() => enviarMensagem(input)}>Enviar</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
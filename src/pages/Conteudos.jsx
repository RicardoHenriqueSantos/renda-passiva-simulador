import { Card } from "@/components/ui/Card";

export default function Conteudos() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">


      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] text-center mb-8">
          📚 Conteúdos Recomendados
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* 📖 Livros */}
          <Card>
            <h2 className="text-2xl font-semibold text-[#0F766E] mb-4">📖 Livros</h2>
            <ul className="space-y-3">
              <li>• <strong>Os Segredos da Mente Milionária</strong> – T. Harv Eker</li>
              <li>• <strong>O Homem Mais Rico da Babilônia</strong> – George S. Clason</li>
              <li>• <strong>Como Organizar Sua Vida Financeira </strong> – Gustavo Cerbasi</li>
              <li>• <strong>Mira na Independência Financeira </strong> – Eduardo Mira</li>
              <li>• <strong>Pai Rico, Pai Pobre</strong> – Robert Kiyosaki </li>
              <li>• <strong>O Investidor Inteligente</strong> – Benjamin Graham</li>
              <li>• <strong>Rei dos Dividendos</strong> – Luiz Barsi Filho</li>
              <li>• <strong>Axiomas de Zurique</strong> – Max Gunther</li>
              <li>• <strong>Deixe de Ser Pobre</strong> – Eduardo Feldberg</li>
            </ul>
          </Card>

          {/* 🎥 Vídeos */}
          <Card>
            <h2 className="text-2xl font-semibold text-[#0F766E] mb-4">🎥 Vídeos</h2>
            <ul className="space-y-3">

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=gCeJ5qFPcI8" className="text-[#22C55E] hover:underline" target="_blank"> 7 Coisas Óbvias Mas Quase Ninguém Faz </a> — Educação Financeira
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=qpTVQ616wok" className="text-[#22C55E] hover:underline" target="_blank"> Ganhe Dinheiro com Segurança </a> — Renda Fixa e Renda Variável
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=LLG2RrpMwkA" className="text-[#22C55E] hover:underline" target="_blank"> Renda Fixa para Investidores Iniciantes </a> — Renda Fixa
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=iQFmtW3zlmQ" className="text-[#22C55E] hover:underline" target="_blank"> Aulão para Começar a Investir Hoje! </a> — Tesouro Direto
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=eMDgWLWOX84" className="text-[#22C55E] hover:underline" target="_blank"> Montando uma Carteira de Investimentos </a> — Carteira de Investimentos
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=d-5QQyYAnsk" className="text-[#22C55E] hover:underline" target="_blank"> Ações Baratas para Começar com R$ 50,00 </a> — Ações
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=3PaeIzHjoJI" className="text-[#22C55E] hover:underline" target="_blank"> Fundos Imobiliários para Começar com R$ 50,00 </a> — Fundos Imobiliários
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=CZxOyqNgUWI" className="text-[#22C55E] hover:underline" target="_blank"> Investimentos em Dólar para Iniciantes </a> — Dólar
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/watch?v=VSO9izDJx6A" className="text-[#22C55E] hover:underline" target="_blank"> Tudo Sobre Criptomoedas </a> — Criptomoedas
              </li>
            </ul>
          </Card>

          {/* 🎧 Podcasts */}
          <Card>
            <h2 className="text-2xl font-semibold text-[#0F766E] mb-4">🎧 Podcasts</h2>
            <ul className="space-y-3">
              <li>
                • {" "}
                <a href="https://www.youtube.com/@pobreshow" className="text-[#22C55E] hover:underline" target="_blank"> Pobre Show </a> — Primo Pobre - Eduardo Feldberg
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/@PrimoCast" className="text-[#22C55E] hover:underline" target="_blank"> PrimoCast </a> — Primo Rico - Thiago Nigro
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/@StockPickers" className="text-[#22C55E] hover:underline" target="_blank"> Stock Pickers </a> — Stock Pickers - InfoMoney
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/@MePoupe" className="text-[#22C55E] hover:underline" target="_blank"> PoupeCast </a> — Me Poupe! - Nathalia Arcuri
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/@GemeosInvestemPodcast" className="text-[#22C55E] hover:underline" target="_blank"> Gêmeos Investem Podcast </a> — Gêmeos Investem - Matheus e Renan Mizobe
              </li>

              <li>
                • {" "}
                <a href="https://www.youtube.com/@TUBARAODABOLSA" className="text-[#22C55E] hover:underline" target="_blank"> TubaCast </a> — Tubarão da Bolsa - Luan Onofre
              </li>

            </ul>
          </Card>

          {/* 📦 Materiais Extras */}
          <Card>
            <h2 className="text-2xl font-semibold text-[#0F766E] mb-4">📦 Materiais Extras</h2>
            <ul className="space-y-3">

              <li>
                • {" "}
                <a href="https://www.ev.org.br/cursos/educacao-financeira" className="text-[#22C55E] hover:underline" target="_blank"> Curso de Educação Financeira - Gratuito</a> — Fundação Bradesco
              </li>

              <li>
                • {" "}
                <a href="https://www.infomoney.com.br/conteudos/planilhas/controle-financeiro-de-gastos/" className="text-[#22C55E] hover:underline" target="_blank"> Planilha de Controle Financeiro de Gastos - </a> — InfoMoney
              </li>

              <li>
                • {" "}
                <a href="https://www.tesourodireto.com.br/" className="text-[#22C55E] hover:underline" target="_blank"> Tesouro Direto </a> — Site Oficial
              </li>

              <li>
                • {" "}
                <a href="https://indique.rico.com.vc/indicado?i=cdb400-RICARDO-6591801" className="text-[#22C55E] hover:underline" target="_blank"> Invista o seu Dinheiro de forma Segura, Rápida e Fácil </a> — Rico
              </li>

              <li>
                • {" "}
                <a href="https://nomad.onelink.me/wIQT/Conta?code=H7WWM4P5CK%26n=Ricardo%20Henrique%20Santos" className="text-[#22C55E] hover:underline" target="_blank"> Conta Digital em Dólar, Cartão e Investimentos </a> — Nomad
              </li>

              <li>
                • {" "}
                <a href="https://coinbase.com/join/7LWYDHR?src=android-link" className="text-[#22C55E] hover:underline" target="_blank"> A Exchange de Cripto que Você pode Confiar  </a> — Coinbase
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}

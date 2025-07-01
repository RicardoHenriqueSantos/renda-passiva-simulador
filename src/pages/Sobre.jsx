const Sobre = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#0F766E]">
            Sobre o Projeto
          </h1>

          <p className="mb-4 text-gray-700 text-lg">
            Este projeto foi criado com o propósito de ajudar pessoas a entenderem,
            de forma clara e prática, quanto precisam investir para conquistar sua
            liberdade financeira e construir uma fonte sólida de{" "}
            <strong>renda passiva</strong>.
          </p>

          <p className="mb-4 text-gray-700 text-lg">
            Através de simulações, análises e conteúdos educativos, buscamos
            democratizar o acesso ao conhecimento financeiro. Você poderá entender
            como funcionam investimentos como{" "}
            <strong>Renda Fixa, Ações, Fundos Imobiliários, Tesouro Direto e até
            Criptomoedas</strong>.
          </p>

          <p className="mb-4 text-gray-700 text-lg">
            <strong>Aviso:</strong> as informações disponibilizadas são de caráter
            exclusivamente educativo. Este projeto não constitui recomendação de
            investimentos, análise financeira ou consultoria. Sempre consulte
            profissionais certificados antes de tomar decisões financeiras.
          </p>

          <div className="bg-white border border-green-200 rounded-xl p-4 mb-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              🔧 Tecnologias Utilizadas
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>⚛️ React + Tailwind CSS + JavaScript</li>
              <li>📊 Recharts </li>
              <li>⚡ Vite</li>
              <li>🧠 OpenAI ChatGPT</li>
            </ul>
          </div>

          <div className="bg-white border border-green-200 rounded-xl p-4 mb-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              🤖 Apoio de Inteligência Artificial
            </h2>
            <p className="text-gray-700">
              Este projeto foi desenvolvido por Ricardo Henrique Santos com o apoio
              do ChatGPT, combinando conhecimento técnico, educação financeira e
              inteligência artificial para oferecer uma experiência completa ao
              usuário.
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Projeto desenvolvido com fins educacionais. © {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Sobre;
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">

      <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center gap-8 px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F766E]">
          Construa sua <span className="text-[#22C55E]">Liberdade Financeira</span>
        </h1>
        <p className="text-lg max-w-2xl text-gray-700">
          Descubra quanto precisa investir para gerar sua renda passiva dos sonhos. Simule de forma simples, rápida e com clareza.
        </p>

        <Button
          onClick={() => (window.location.href = "/simulacao")}
        >
          Iniciar Simulação
        </Button>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <Card>
            <h2 className="text-xl font-semibold text-[#0F766E] mb-2">Simule seu Futuro</h2>
            <p className="text-gray-600">Informe seus objetivos e descubra como construir sua renda passiva.</p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-[#0F766E] mb-2">Análise Personalizada</h2>
            <p className="text-gray-600">Receba uma análise com sugestões de alocação conforme seu perfil.</p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-[#0F766E] mb-2">Educação Financeira</h2>
            <p className="text-gray-600">Acesse conteúdos, vídeos e livros para se preparar antes de investir.</p>
          </Card>
        </div>
      </main>

    </div>
  );
}
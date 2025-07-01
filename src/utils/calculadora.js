// ✅ Função calcularPorAporte
export function calcularPorAporte(dados) {
  const { rendaDesejada, aporteMensal, perfil } = dados;

  const renda = parseFloat(rendaDesejada);
  const aporte = parseFloat(aporteMensal);

  const inflacaoAnual = 0.04;
  const inflacaoMensal = Math.pow(1 + inflacaoAnual, 1 / 12) - 1;

  const rentabilidadeAnual = perfil === "Conservador" ? 0.07 : perfil === "Moderado" ? 0.09 : 0.12;

  const distribuicao =
    perfil === "Conservador"
      ? { "Tesouro Direto": 40, "Renda Fixa": 40, "Fundos Imobiliários": 20 }
      : perfil === "Moderado"
        ? { "Tesouro Direto": 25, "Renda Fixa": 35, "Fundos Imobiliários": 20, "Ações": 15, "Criptomoedas": 5 }
        : { "Fundos Imobiliários": 25, "Ações": 50, "Criptomoedas": 15, "Renda Fixa": 10 };

  const rentabilidadeRealAnual = (1 + rentabilidadeAnual) / (1 + inflacaoAnual) - 1;
  const rentabilidadeMensal = Math.pow(1 + rentabilidadeRealAnual, 1 / 12) - 1;

  const taxaRetiradaAnual = 0.06;
  const patrimonioAlvo = (renda * 12) / taxaRetiradaAnual;

  let saldo = 0;
  let meses = 0;
  const evolucao = [];

  while (saldo < patrimonioAlvo) {
    saldo += aporte;
    saldo += saldo * rentabilidadeMensal;
    meses++;

    evolucao.push({ mes: meses, saldo });

    if (meses > 1000) break;
  }

  return {
    patrimonioAlvo: Math.round(patrimonioAlvo),
    meses,
    anos: Math.floor(meses / 12),
    restoMeses: meses % 12,
    distribuicao,
    evolucao,
  };
}


// ✅ Função calcularPorPrazo
export function calcularPorPrazo(dados) {
  const { rendaDesejada, prazoAnos, perfil } = dados;

  const renda = parseFloat(rendaDesejada);
  const meses = prazoAnos * 12;

  const inflacaoAnual = 0.04;
  const inflacaoMensal = Math.pow(1 + inflacaoAnual, 1 / 12) - 1;

  const rentabilidadeAnual = perfil === "Conservador" ? 0.07 : perfil === "Moderado" ? 0.09 : 0.12;

  const distribuicao =
    perfil === "Conservador"
      ? { "Tesouro Direto": 40, "Renda Fixa": 40, "Fundos Imobiliários": 20 }
      : perfil === "Moderado"
        ? { "Tesouro Direto": 25, "Renda Fixa": 35, "Fundos Imobiliários": 20, "Ações": 15, "Criptomoedas": 5 }
        : { "Fundos Imobiliários": 25, "Ações": 50, "Criptomoedas": 15, "Renda Fixa": 10 };

  const rentabilidadeRealAnual = (1 + rentabilidadeAnual) / (1 + inflacaoAnual) - 1;
  const rentabilidadeMensal = Math.pow(1 + rentabilidadeRealAnual, 1 / 12) - 1;

  const taxaRetiradaAnual = 0.06;
  const patrimonioAlvo = (renda * 12) / taxaRetiradaAnual;

  const fator = Math.pow(1 + rentabilidadeMensal, meses);
  const aporteMensal = (patrimonioAlvo * rentabilidadeMensal) / (fator - 1);

  let saldo = 0;
  const evolucao = [];

  for (let i = 1; i <= meses; i++) {
    saldo += aporteMensal;
    saldo += saldo * rentabilidadeMensal;
    evolucao.push({ mes: i, saldo });
  }

  return {
    patrimonioAlvo: Math.round(patrimonioAlvo),
    aporteMensal: Math.round(aporteMensal),
    meses,
    anos: prazoAnos,
    distribuicao,
    evolucao,
  };
}


// ✅ Função calcularSimulacao (modo clássico por aporte)
export function calcularSimulacao(dados) {
  return calcularPorAporte(dados);
}


// ✅ Função simularCenarios
export function simularCenarios(dados) {
  const perfis = {
    Conservador: 0.07,
    Moderado: 0.09,
    Arrojado: 0.12,
  };

  const baseRent = perfis[dados.perfil];

  const cenarios = [
    { nome: "Otimista", ajuste: 1.2, icone: "📈" },
    { nome: "Neutro", ajuste: 1.0, icone: "⚖️" },
    { nome: "Pessimista", ajuste: 0.8, icone: "📉" },
  ];

  return cenarios.map((c) => {
    const rentabilidadeAnual = baseRent * c.ajuste;
    const rentabilidadeMensal = Math.pow(1 + rentabilidadeAnual, 1 / 12) - 1;

    const renda = parseFloat(dados.rendaDesejada);
    const aporte =
      dados.modo === "prazo"
        ? calcularPorPrazo(dados).aporteMensal
        : parseFloat(dados.aporteMensal);

    const patrimonioAlvo = (renda * 12) / 0.06;

    let saldo = 0;
    let meses = 0;

    while (saldo < patrimonioAlvo) {
      saldo += aporte;
      saldo += saldo * rentabilidadeMensal;
      meses++;

      if (meses > 1000) break;
    }

    return {
      nome: c.nome,
      icone: c.icone,
      rentabilidade: rentabilidadeAnual,
      meses,
    };
  });
}
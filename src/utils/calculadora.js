// ✅ Parâmetros econômicos atualizados para 2025
const inflacaoAnual = 0.0532; // IPCA atual 5,32%
const inflacaoMensal = Math.pow(1 + inflacaoAnual, 1 / 12) - 1;

const rentabilidades = {
  Conservador: 0.10,
  Moderado: 0.12,
  Arrojado: 0.15,
};

const distribuicoes = {
  Conservador: {
    "Tesouro Direto": 50,
    "Renda Fixa": 40,
    "Fundos Imobiliários": 10,
  },
  Moderado: {
    "Tesouro Direto": 20,
    "Renda Fixa": 35,
    "Fundos Imobiliários": 20,
    "Ações": 15,
    "Criptomoedas": 5,
    "Dólar": 5,
  },
  Arrojado: {
    "Fundos Imobiliários": 20,
    "Ações": 45,
    "Criptomoedas": 15,
    "Dólar": 10,
    "Renda Fixa": 10,
  },
};

const taxaRetiradaAnual = 0.06;

// ✅ Função calcularPorAporte
export function calcularPorAporte(dados) {
  const { rendaDesejada, aporteMensal, perfil } = dados;
  const renda = parseFloat(rendaDesejada);
  const aporte = parseFloat(aporteMensal);

  const rentabilidadeAnual = rentabilidades[perfil];
  const rentabilidadeRealAnual =
    (1 + rentabilidadeAnual) / (1 + inflacaoAnual) - 1;
  const rentabilidadeMensal = Math.pow(1 + rentabilidadeRealAnual, 1 / 12) - 1;

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
    distribuicao: distribuicoes[perfil],
    evolucao,
  };
}

// ✅ Função calcularPorPrazo
export function calcularPorPrazo(dados) {
  const { rendaDesejada, prazoAnos, perfil } = dados;
  const renda = parseFloat(rendaDesejada);
  const meses = prazoAnos * 12;

  const rentabilidadeAnual = rentabilidades[perfil];
  const rentabilidadeRealAnual =
    (1 + rentabilidadeAnual) / (1 + inflacaoAnual) - 1;
  const rentabilidadeMensal = Math.pow(1 + rentabilidadeRealAnual, 1 / 12) - 1;

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
    distribuicao: distribuicoes[perfil],
    evolucao,
  };
}

// ✅ Função calcularSimulacao (modo clássico por aporte)
export function calcularSimulacao(dados) {
  return calcularPorAporte(dados);
}

// ✅ Função simularCenarios
export function simularCenarios(dados) {
  const baseRent = rentabilidades[dados.perfil];

  const cenarios = [
    { nome: "Otimista", ajuste: 1.2, icone: "📈" },
    { nome: "Neutro", ajuste: 1.0, icone: "⚖️" },
    { nome: "Pessimista", ajuste: 0.8, icone: "📉" },
  ];

  return cenarios.map((c) => {
    const rentabilidadeAnual = baseRent * c.ajuste;
    const rentabilidadeRealAnual =
      (1 + rentabilidadeAnual) / (1 + inflacaoAnual) - 1;
    const rentabilidadeMensal =
      Math.pow(1 + rentabilidadeRealAnual, 1 / 12) - 1;

    const renda = parseFloat(dados.rendaDesejada);
    const aporte =
      dados.modo === "prazo"
        ? calcularPorPrazo(dados).aporteMensal
        : parseFloat(dados.aporteMensal);

    const patrimonioAlvo = (renda * 12) / taxaRetiradaAnual;

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
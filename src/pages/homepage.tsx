import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {

  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  const tests = [
    {
      id: 1,
      title: "Análise comportamental",
      description:
        "A análise comportamental avalia o perfil psicológico e as tendências de comportamento do colaborador em diferentes situações. É uma ferramenta importante para entender como cada pessoa age, decide e interage em grupo.",
    },
    {
      id: 2,
      title: "Análise de perfil profissional",
      description:
        "Essa análise identifica as principais habilidades e competências do colaborador, auxiliando a empresa a alinhar talentos com cargos e equipes de maneira estratégica e eficiente.",
    },
    {
      id: 3,
      title: "Análise de raciocínio lógico",
      description:
        "Avalia a capacidade de resolver problemas, interpretar dados e tomar decisões baseadas em lógica e coerência. Ideal para cargos que exigem pensamento crítico e análise constante.",
    },
  ];

  const results = [
    {
      id: 1,
      name: "Ana Paula",
      softSkills: "Comunicativa, Proativa, Capacidade de negociação",
    },
    {
      id: 2,
      name: "Ana Paula",
      softSkills: "Comunicativa, Proativa, Capacidade de negociação",
    },
    {
      id: 3,
      name: "Ana Paula",
      softSkills: "Comunicativa, Proativa, Capacidade de negociação",
    },
  ];

  const scrollToTests = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const section = document.querySelector("#testes");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#B3E099] text-gray-800 scroll-smooth">
      <Navbar />

      {/* SEÇÃO 1 */}
<section className="flex flex-col md:flex-row items-center justify-between gap- px-8 md:px-60 py-45 bg-">

  <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
    <img
      src="/images/logo-lume.png"
      alt="Logo Lume"
      className="w-64 h-auto mb-3"
    />
  </div>

  <div className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left">
    <h2 className="text-xl font-semibold mb-4 text-black">
      Aqui você descobre os novos talentos da sua empresa.
    </h2>

    <p className="text-gray leading-relaxed mb-6">
      A LUME foi criada com o objetivo de descobrir e aprimorar
      <strong> soft skills</strong>, podendo gerar análises sobre cada
      colaborador, a fim de entender qual pode ser o papel de contribuidor
      dele para com a empresa.
    </p>

    <a
      href="#testes"
      onClick={scrollToTests}
      className="bg-[#FFFDD0] hover:bg-[#f6f1b3] text-gray-900 font-medium px-8 py-3 rounded-full shadow-md transition-all"
    >
      Ver mais
    </a>
  </div>
</section>


      {/* SEÇÃO 2 */}
      <section
        id="testes"
        className="bg-[#FEFCD0] py-20 px-6 text-center scroll-mt-24"
      >
        <h2 className="text-2xl font-bold mb-10">
          Confira os testes disponíveis
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {tests.map((test) => (
            <div
              key={test.id}
              onClick={() =>
                setSelectedTest(selectedTest === test.id ? null : test.id)
              }
              className="bg-[#FFFDEB] shadow-md rounded-xl hover:shadow-lg transition-all p-10 flex flex-col items-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#D3E8B0] rounded-full mb-4 flex items-center justify-center">
                <img
                  src="/images/icon-calendar.png"
                  alt="Ícone de teste"
                  className="w-8 h-8"
                />
              </div>
              <p className="font-semibold text-gray-700 text-lg">
                {test.title}
              </p>

              {selectedTest === test.id && (
                <p className="mt-4 text-gray-600 text-sm leading-relaxed transition-all duration-300">
                  {test.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 3*/}
      <section className="bg-[#FEFCD0] py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-10">Resultados possíveis</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow-md rounded-xl hover:shadow-lg transition-all p-8"
            >
              <div className="flex justify-center mb-4">
                <img
                  src="/images/icon-user.png"
                  alt="Avatar do participante"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <p className="font-semibold text-lg">{result.name}</p>
              <p className="text-gray-600 mt-2 text-sm font-medium">
                Soft Skills:
              </p>
              <p className="text-gray-700 text-sm">{result.softSkills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FEFCD0] py-20 px-6 text-center">
        <h2 className="text-xl font-semibold mb-4">
            Que tal adquirir um novo método de avaliação de sofftskills para sua empresa?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
        A <strong>LUME</strong> estará aqui para te ajudar a <strong>humanizar</strong> processos <strong>aprimorando habilidades únicas</strong> de cada colaborador(a).
        </p>
      </section>

      <section className="text-center py-16 px-6 bg-[#bed084] mt">
        <p className="text-3xl font-bold mb-4">PLANO BUSINESS</p>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          O plano ideal para empresas de médio porte, com até 70 colaboradores.
          Aqui, é cobrado apenas R$79,00 reais por colaborador. 
        </p>

      </section>

      <Footer />
    </div>
  );
}

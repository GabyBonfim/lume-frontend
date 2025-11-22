import { FaGithub, FaLinkedin } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Sobre() {
  const equipe = [
    {
      nome: "Gabriely Bonfim Silva",
      foto: "https://via.placeholder.com/300",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      nome: "Mirelly Sousa Alves",
      foto: "https://via.placeholder.com/300",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      nome: "Henrique Vespasiano",
      foto: "https://via.placeholder.com/300",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-gray-800">
            <Navbar />
      <section className="text-center py-16 px-6 bg-[#bed084]">
        <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          A LUME é uma plataforma inovadora voltada para o desenvolvimento de 
          soft skills através de treinos inteligentes, gamificação e análises 
          personalizadas com IA. Ajudamos pessoas e empresas a evoluírem com 
          clareza, propósito e tecnologia.
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Nosso Time
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {equipe.map((pessoa, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={pessoa.foto}
                alt={pessoa.nome}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 "
              />

              <h3 className="text-xl font-semibold">{pessoa.nome}</h3>

              <div className="flex justify-center gap-6 mt-4 text-2xl">
                <a
                  href={pessoa.github}
                  target="_blank"
                  className="hover:text-indigo-600 transition"
                >
                  <FaGithub />
                </a>

                <a
                  href={pessoa.linkedin}
                  target="_blank"
                  className="hover:text-indigo-600 transition"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

        <section className="text-center py-16 px-6 bg-[#bed084] mb-20">
        <p className="text-3xl font-bold mb-4">"O sucesso é a soma dos pequenos esforços repetidos dia após dia."</p>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          - Funders, LUME | Gabriely Bonfim, Henrique Vespasiano & Mirelly Sousa.
        </p>
      </section>
      <Footer />
    </div>
  );
}

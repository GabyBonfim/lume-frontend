export default function Footer() {
  return (
    <footer className="bg-[#B3E099] text-gray-800 py-10 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo e Slogan */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="text-5xl font-bold tracking-wide text-gray-900">
        <img
            src="/images/logo-lume.png"
            alt="Logo Lume"
            className="w-40 h-auto mx-auto"
          />
          </div>
          <p className="text-sm mt-1">caminhos inteligentes guiados pela mente e dados.</p>
        </div>

        {/* Créditos */}
        <div className="text-center md:text-right text-sm">
          <p>
            Por: <span className="font-semibold">Gabriely Bonfim</span> |{' '}
            <span className="font-semibold">Henrique Vespasiano</span> |{' '}
            <span className="font-semibold">Mirelly Sousa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

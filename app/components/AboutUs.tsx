'use client';

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Conócenos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-justify">
              <span className=" text-purple-400">DevOpsDays</span> es una conferencia global sobre prácticas,
              herramientas y cultura DevOps. Reúne a profesionales para compartir conocimientos y experiencias. Nuestra
              misión en <span className=" text-cyan-400">DevOpsDays Lima</span> es impulsar la evolución tecnológica con
              un evento que conecta a profesionales, fomenta el intercambio de conocimientos DevOps y refuerza una
              cultura de innovación continua basada en experiencias reales.{' '}
              <a
                className="font-bold text-cyan-400"
                href="https://devopsdays.org/events/2025-lima/welcome/"
                target="_blank"
              >
                Saber más
              </a>
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                <h4 className="text-cyan-400 text-xl font-bold mb-2">30000+</h4>
                <p className="text-gray-400">Asistentes a nivel Global</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                <h4 className="text-purple-400 text-xl font-bold mb-2">60+</h4>
                <p className="text-gray-400">Países Organizadores</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Innovación</h3>
              <p className="text-gray-400">Para transformar la tecnología con nuevas ideas</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Colaboración</h3>
              <p className="text-gray-400">Para crecer juntos y construir soluciones mejores</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Mejora continua</h3>
              <p className="text-gray-400">Para aprender, adaptarnos y evolucionar cada día</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

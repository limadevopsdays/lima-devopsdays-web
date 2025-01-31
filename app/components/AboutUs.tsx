"use client";

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Conócenos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
            DevOpsDays es una serie de conferencias globales sobre cultura, prácticas y herramientas de DevOps, que fomentan la colaboración entre desarrollo y operaciones para mejorar la entrega de software, a través de charlas, discusiones y talleres.
            </p>
            <p className="text-gray-300 leading-relaxed">
            Nuestra misión es fomentar la colaboración, inspirar la innovación e impulsar el futuro de la tecnología a través de debates significativos y oportunidades para establecer contactos.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                <h4 className="text-cyan-400 text-xl font-bold mb-2">30000+</h4>
                <p className="text-gray-400">Asistentes</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800">
                <h4 className="text-purple-400 text-xl font-bold mb-2">60+</h4>
                <p className="text-gray-400">Países</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Innovación</h3>
              <p className="text-gray-400">Presentación de prácticas e investigación de vanguardia</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Networking</h3>
              <p className="text-gray-400">Conéctese con líderes y colegas del sector</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Conocimiento</h3>
              <p className="text-gray-400">Talleres y sesiones dirigidos por expertos</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Futuro</h3>
              <p className="text-gray-400">Dar forma al futuro de Devops</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
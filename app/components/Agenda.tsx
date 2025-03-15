"use client";

import { Calendar } from "lucide-react";

export default function Agenda() {
  return (
    <section id="agenda" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Agenda de la Conferencia
        </h2>
        <h3 className="text-2xl font-bold text-center text-gray-400 mb-8"> 🚀 ¡Los DevOpsDays están por llegar! Prepárate para sumergirte en las últimas tendencias de #DevOps, #automatización, #microservicios, #CI/CD y mucho más.</h3>
        {/* <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-400">Día 1 - Ceremonia de Apertura</h3>
              <span className="text-purple-400">Agosto 15, 2024</span>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <span className="text-gray-400 min-w-[100px]">09:00 AM</span>
                <div>
                  <h4 className="text-white font-semibold">Discurso de Benvenida</h4>
                  <p className="text-gray-400">Discurso inaugural y discurso de apertura</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-gray-400 min-w-[100px]">10:30 AM</span>
                <div>
                  <h4 className="text-white font-semibold">Panel sobre el futuro de DevOps</h4>
                  <p className="text-gray-400">Los principales expertos debaten las tendencias de DevOps</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-400">Día 2 - Sesiones técnicas</h3>
              <span className="text-purple-400">Agosto 16, 2024</span>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <span className="text-gray-400 min-w-[100px]">09:00 AM</span>
                <div>
                  <h4 className="text-white font-semibold">Talleres técnicos</h4>
                  <p className="text-gray-400">Sesiones prácticas en varios temas</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-gray-400 min-w-[100px]">02:00 PM</span>
                <div>
                  <h4 className="text-white font-semibold">Presentaciones</h4>
                  <p className="text-gray-400">Presentaciones de investigación en sesiones paralelas</p>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </section>
  );
}
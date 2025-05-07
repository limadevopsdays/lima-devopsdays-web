export default function SponsorPricingTable() {

  return (
    <div className="max-w-screen -mx-4 px-4 md:mx-0">
      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-600">
        <div className="inline-block min-w-screem align-middle">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-white font-semibold text-left p-4 border-b bg-gray-2 whitespace-nowrap rounded-tl-lg">Beneficios</th>
                <th className="text-white font-semibold text-center p-4 border-b bg-gray-2 whitespace-nowrap">Bronce</th>
                <th className="text-white font-semibold text-center p-4 border-b bg-gray-2 whitespace-nowrap">Plata</th>
                <th className="text-white font-semibold text-center p-4 border-b bg-gray-2 whitespace-nowrap rounded-tr-lg">Oro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Precio paquete normal</td>
                <td className="text-white p-4 text-center border-b border-surface-border">$1,500.00</td>
                <td className="text-white p-4 text-center border-b border-surface-border">$3,000.00</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">$5,000.00</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Paquete Early Bird: 20% Dcto (hasta 23/04/2025)</td>
                <td className="text-white p-4 text-center border-b border-surface-border">$1,200.00</td>
                <td className="text-white p-4 text-center border-b border-surface-border">$2,400.00</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">$4,000.00</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Entradas de cortesía</td>
                <td className="text-white p-4 text-center border-b border-surface-border">2</td>
                <td className="text-white p-4 text-center border-b border-surface-border">4</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">8</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Logos en web, banners y correos a participantes</td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Logo en materiales promocionales</td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Logo en pantallas dentro del evento y/o durante los descansos</td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">
                  <span className="text-teal-500">✓</span>
                </td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">% descuento entradas corporativas (máximo 10)</td>
                <td className="text-white p-4 text-center border-b border-surface-border">5%</td>
                <td className="text-white p-4 text-center border-b border-surface-border">10%</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">20%</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Reconocimiento en redes sociales (LinkedIn e Instagram)</td>
                <td className="text-white p-4 text-center border-b border-surface-border">Mención</td>
                <td className="text-white p-4 text-center border-b border-surface-border">Publicidad</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">Publicidad Destacada</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Mención del presentador al inicio del evento</td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="text-white p-4 text-center border-b border-surface-border">4</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">8</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l border-surface-border">Dimensiones del stand</td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="text-white p-4 text-center border-b border-surface-border">Pequeño (1m×1m)</td>
                <td className="text-white p-4 text-center border-b border-r border-surface-border">Grande (3m×2m)</td>
              </tr>
              <tr>
                <td className="text-white p-4 text-left border-b border-l rounded-bl-lg border-surface-border">Presentación en escenario central</td>
                <td className="text-white p-4 text-center border-b border-surface-border">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="text-white p-4 text-center border-b border-surface-border">2 min.</td>
                <td className="text-white p-4 text-center border-b border-r rounded-br-lg border-surface-border">5 min.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

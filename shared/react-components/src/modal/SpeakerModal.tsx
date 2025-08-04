import CloseIcon from '../icons/CloseIcon';
import Subtitle from '../subtitle';

export interface SpeakerModalProps {
  id: string;
  imageSrc?: string;
  name: string;
  talkTitle?: string;
  talkAbstract?: string;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({ id, imageSrc, name, talkTitle, talkAbstract }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="peer hidden" />
      <div className="z-50 fixed inset-0 items-center justify-center peer-checked:flex hidden">
        <div className="w-[90%] md:max-w-4xl bg-gray-4 text-white p-6 shadow-lg rounded-2xl shadow-button-background-tertiary-hover">
          <div className="flex justify-end">
            <label htmlFor={id} className="cursor-pointer">
              <CloseIcon />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Speaker Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mx-auto">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full flex items-center justify-center text-white"
                  style={{ display: imageSrc ? 'none' : 'flex' }}
                >
                  <span className="text-6xl opacity-70">👤</span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <Subtitle size='lg'>{name}</Subtitle>

              {talkTitle && (
                <div>
                  <h4 className="text-lg font-medium text-white">{talkTitle}</h4>
                </div>
              )}

              {talkAbstract && (
                <div>
                  <p className="text-gray-400 leading-relaxed">
                    {talkAbstract}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerModal;

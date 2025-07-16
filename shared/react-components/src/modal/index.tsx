import Button from "../button";
import CloseIcon from "../icons/CloseIcon";
import Subtitle from "../subtitle";

export interface InfoModalProps {
  id: string;
  image: string;
  title: string;
  buttonText?: string;
  richText: string;
  buttonLink?: string;
}

export default function Modal({ id, image, title, buttonText, richText, buttonLink }: Readonly<InfoModalProps>) {

  return (
    <div>
      <input type="checkbox" id={id} className="peer hidden" />
      <div className="z-50 fixed inset-0 items-center justify-center peer-checked:flex hidden ">
        <div className="w-[90%] md:max-w-2/3 bg-gray-4 text-white p-6 shadow-lg rounded-2xl p-1 shadow-button-background-tertiary-hover ">
          <div className="flex justify-end">
            <label htmlFor={id} className="cursor-pointer">
              <CloseIcon />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <img className="md:w-4/12" src={image} alt={id} />
            <div className="md:w-4/6 flex flex-col gap-4">
              <Subtitle size='lg'>{title}</Subtitle>
              <p>{richText}</p>
              {buttonText && <Button className="mt-4 max-w-[200px] text-center" variant="primary" as="a" href={buttonLink}>{buttonText}</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

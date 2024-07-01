import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsAppIcon: FC = () => {
  return (
    <div
      className="fixed bottom-7 right-4 tooltip tooltip-left"
      data-tip="Chat with us on WhatsApp"
    >
      <a
        href="https://wa.me/+6596754306"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
      </a>
    </div>
  );
};

export default WhatsAppIcon;

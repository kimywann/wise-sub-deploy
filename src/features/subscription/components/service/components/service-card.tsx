import { type ServiceItem } from "../constants/service-list";
import plus from "@/assets/icon/plus.svg";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {service.name === "직접입력" ? (
        <img src={plus} className="mt-4 h-[4.5rem] w-[4.5rem]" />
      ) : (
        <img
          src={service.image}
          alt={service.name}
          className="mt-4 h-[4.5rem] w-[4.5rem]"
        />
      )}
      <span className="font-medium">{service.name}</span>
    </div>
  );
}

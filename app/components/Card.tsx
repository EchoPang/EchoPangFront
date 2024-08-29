interface CardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="bg-white flex items-center justify-start rounded-lg p-4 h-32">
      <img src={imageSrc} alt={title} className="w-20 h-20" />
      <div className="flex flex-col ml-4">
        <div className="font-pretendard font-bold text-sm text-[#525252] mt-1">
          {title}
        </div>
        <div className="font-pretendard font-bold my-1">{subtitle}</div>
        <div className="font-pretendard text-xs text-[#676767] my-1">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Card;

interface AddOnItemProps {
  name: string;
  price: string;
  description?: string;
}

export default function AddOnItem({ name, price, description }: AddOnItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-lavender/20 last:border-0">
      <div>
        <p className="font-inter text-sm font-medium text-black">{name}</p>
        {description && (
          <p className="font-inter text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <span className="font-playfair text-sm font-semibold text-lavender-dark whitespace-nowrap ml-4">
        {price}
      </span>
    </div>
  );
}

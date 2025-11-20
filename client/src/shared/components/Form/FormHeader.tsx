interface FormHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function FormHeader({
  title,
  subtitle,
  className,
}: FormHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h3 className="font-serif text-2xl mt-4 mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-gray-neutral-400">{subtitle}</p>}
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode | string ;
  color: string;
  variant?: "primary" | "secondary";
}

const variants = {
  primary: "border  cursor-pointer px-2 py-1 rounded-md flex items-center flex justify-center",
  secondary: "border cursor-pointer px-4 py-2 rounded-md flex items-center flex justify-center",
} as const;

export function Button({
  children,
  color,
  variant = "primary",
}: ButtonProps) {
  return (
    <button className={`${variants[variant]} ${color}`}>
      {children}
    </button>
  );
}

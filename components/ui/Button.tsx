

interface ButtonProps {
  children: React.ReactNode,
  color : string,
  variant?: "primary" | "secondary";
}

const variants = {
  primary: "border cursor-pointer px-2 py-1 rounded-md flex  items-center",
  secondary: "border cursor-pointer px-4 py-2 rounded-md flex  items-center",
};

export function Button({children,color,variant}: ButtonProps){
    return<div>
            <button className={`$${variants[variant]} ${color}`}>{children}</button>
    </div>
}


interface ButtonProps {
  children: React.ReactNode,
  color : String;
}
const custom = "border cursor-pointer px-4 py-2 rounded-md flex  items-center"
export function Button({children,color}: ButtonProps){
    return<div>
            <button className={`${custom} ${color}`}>{children}</button>
    </div>
}
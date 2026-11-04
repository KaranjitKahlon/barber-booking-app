import { Input } from "@/components/ui/input"

type InputBasicProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric" | "email"
  autoComplete?: string
}

export default function InputBasic({
    value,
    onChange,
    placeholder = "Enter your name",
    type = "text",
    inputMode = "text",
    autoComplete,
  }: InputBasicProps) {
    return (
      <Input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        className="[width:300px] [max-width:300px] [margin-top:16px] [padding:12px_16px] rounded-md [color:#ffffff] [&::placeholder]:[color:rgba(255,255,255,0.5)]"
      />
    )
  }

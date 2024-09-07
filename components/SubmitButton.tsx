"use client";
import { useFormStatus } from "react-dom";
import { Button, buttonVariants } from "./ui/button";

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={buttonVariants({
        variant: "default",
        className: "w-full",
      })}
    >
      {pending ? "Please wait" : text}
    </Button>
  );
};

export default SubmitButton;

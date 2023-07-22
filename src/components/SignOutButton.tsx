"use client";
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "./ui/Toast";

export interface ISignOutButtonProps {}

const SignOutButton: FC<ISignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (err) {
      toast({
        title: "Error signing in",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign out
    </Button>
  );
};
export default SignOutButton;

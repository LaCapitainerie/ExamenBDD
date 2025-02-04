"use client"

import { Button, ButtonIconProps, ButtonProps } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FaCcApplePay, FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

interface SSOButtonProps {
    mode: "google" | "apple" | "github"
}

type SSOIconType = {
    [Key in SSOButtonProps["mode"]]: JSX.Element
}

const SSOIcon: SSOIconType = {
    "google": (
        <FcGoogle className="w-6 h-6" />
    ),
    "apple": (
        <FaCcApplePay className="w-6 h-6" />
    ),
    "github": (
        <FaGithub className="w-6 h-6" />
    )
}

export function SSOButton({ mode, ...props }: SSOButtonProps & ButtonProps & ButtonIconProps) {
    return (
        <Button {...props} onClick={() => signIn(mode)} variant="outline" className="w-full gap-2">
            {SSOIcon[mode]}{`Login with ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
        </Button>
    )
}
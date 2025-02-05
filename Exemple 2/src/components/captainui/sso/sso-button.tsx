"use client"

import { Button, ButtonIconProps, ButtonProps } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FaCcApplePay, FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

interface SSOButtonProps {
    mode: "google" | "apple" | "github"
    callbackUrl?: Exclude<Parameters<typeof signIn>[1], undefined>["callbackUrl"]
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

export function SSOButton({ mode, callbackUrl, ...props }: SSOButtonProps & ButtonProps & ButtonIconProps) {
    return (
        <Button {...props} onClick={() => signIn(mode, { callbackUrl })} variant="outline" className="w-full gap-2">
            {SSOIcon[mode]}{`Login with ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
        </Button>
    )
}
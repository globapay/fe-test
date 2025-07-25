"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {JSX} from "react";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

interface Props {
    link: string;
    title: string;
    icon: JSX.Element;
    onClick?: () => void;
}

export default function NavbarLink({link, title, icon, onClick} : Props) {
    const pathname: string = usePathname();

    return (
        <div className="space-y-1">
            <Link href={link}>
                <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === link && "bg-orange-200 hover:bg-orange-200 cursor-default")}
                    onClick={onClick}
                >
                    {icon}
                    {title}
                </Button>
            </Link>
        </div>
    )
}
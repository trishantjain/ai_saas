"use client";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from '@/components/sidebar'
import { useEffect, useState } from "react";

const MobileSidebar = () => {

    // Solving Hydration error
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex items-center p-4">
                    <Button variant="ghost" size="icon" className="md:hidden" >
                        <Menu />
                    </Button>
                </div>
            </SheetTrigger>

            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar
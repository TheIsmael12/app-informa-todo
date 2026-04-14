import Image from "next/image";

import Theme from "@/components/ui/Theme";
import Locale from "@/components/ui/Locale";

export default function Navbar() {

    return (

        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <Image
                        src="/logo.svg"
                        alt="Informa DB Logo"
                        loading="eager"
                        width={160}
                        height={60}
                    />
                </div>
                <div className="navbar__actions">
                    <Theme />
                    <Locale />
                </div>
            </div>
        </nav>
    )

}
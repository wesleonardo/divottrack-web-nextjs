import Link from "next/link";
import Image from "next/image";


export default function Header(){
    return (
        <header className="px-6 py-4 border-b border-white/10 header"> 
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" aria-label="Home">
                        <Image
                            src="/headerLogo.gif"
                            width={285}
                            height={45}
                            alt="DivotTrack Logo"
                        />
                    </Link>
                    
                </div>
                <nav className="flex items-center space-x-6">
                    <Link href="/member" className="font-medium text-grey-800">Member</Link>
                    <Link href="/create-account" className="font-medium text-grey-800">Create Account</Link>
                    <Link href="/course-finder" className="font-medium text-grey-800">Course Finder</Link>
                </nav>
            </div>
        </header>
    )   
}
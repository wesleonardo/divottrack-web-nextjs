import Link from "next/link";

export default async function Page(){
    
    
    return <div className="text-center pt-12">
        <h1 className="text-4xl font-bold md-6">Member Section</h1>
        <br/>
        <Link href="/member/add-round" className="font-medium text-grey-800">Add Round</Link>
        <br/>
        <Link href="/member/rounds" className="font-medium text-grey-800">Rounds</Link>
        <br/>
        <Link href="/member/add-course" className="font-medium text-grey-800">Add Course</Link>
      </div>
}   
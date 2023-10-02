export default function DocumentLink({link, href}:{link: string, href: string}){
    return(
        <a href={href} target="_blank" className="bg-slate-100 inline-block p-2 rounded-md text-slate-900">
            <p>View {link}</p>
        </a>
    )
}
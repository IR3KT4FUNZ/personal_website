import { Link, useMatch, useResolvedPath } from "react-router-dom"
function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Eric Wang</Link>
            <ul>
                <CustomLink to="/home">Home</CustomLink>
                <CustomLink to="/chess_visualizer">Chess Visualizer</CustomLink>
                <CustomLink to="/projects">Projects</CustomLink>
                <CustomLink to="/awards">Awards/Certificates</CustomLink>
                <CustomLink to="/about">Contact/About Me</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar
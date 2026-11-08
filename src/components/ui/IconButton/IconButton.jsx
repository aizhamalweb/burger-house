import './IconButton.css'
export default function IconButton({ label, children, ...props }) { return <button type="button" className="icon-button" aria-label={label} {...props}>{children}</button> }

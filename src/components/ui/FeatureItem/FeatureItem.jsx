export default function FeatureItem({ icon, children, framed = false }) {
 return <div className={`feature ${framed ? 'feature--framed' : ''}`}><span className="feature__icon" aria-hidden="true">{icon}</span><p>{children}</p></div>
}

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <div className="ornament">
        <svg width="60" height="24" viewBox="0 0 60 24" fill="none" stroke="#CFAF6F" strokeWidth="0.8">
          <path d="M30 20 C25 15, 18 12, 10 14"/>
          <path d="M30 20 C35 15, 42 12, 50 14"/>
          <path d="M30 20 C28 14, 25 8, 22 4"/>
          <path d="M30 20 C32 14, 35 8, 38 4"/>
        </svg>
      </div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="section-rule"></div>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}

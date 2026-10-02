export function Footer() {
  return (
    <footer className="footer">
      <a href="#top" className="nav-logo" aria-label="Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mark" src="/images/logo-mark.svg" alt="" />
        <span>Studio</span>
      </a>
      <div className="footer-copy">Copyright © 2026 Studio. All Rights Reserved.</div>
      <div className="footer-status">
        <i />
        <span>OPEN TO WORK</span>
      </div>
    </footer>
  );
}

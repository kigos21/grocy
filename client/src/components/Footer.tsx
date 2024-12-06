function Footer() {
  return (
    <footer className="border-t p-4">
      <div className="mx-auto max-w-screen-lg">
        <p className="mb-1 text-lg font-semibold tracking-wider">Grocy ツ</p>
        <p className="mb-6 text-sm text-muted">
          Your smart grocery companion. Shop smarter, eat better.
        </p>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Grocy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

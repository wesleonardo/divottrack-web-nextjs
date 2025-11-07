export default function Footer() {
  return (
    <footer className="mt-auto border-t border-grey-200 mt-12 pt-6 pb-6 text-center footer">
        <p className="text-sm text-grey-500">
        &copy; {new Date().getFullYear()} DivotTrak. All rights reserved.
        </p>
    </footer>
  );
}
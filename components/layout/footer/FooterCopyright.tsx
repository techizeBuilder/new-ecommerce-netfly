export function FooterCopyright() {
  return (
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
    </div>
  );
}
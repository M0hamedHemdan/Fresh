export default function Footer() {
  return (
    <>
      <nav className="bg-emerald-600 fixed bottom-0 left-0 right-0 font-bold text-white  p-3">
        <div className="flex justify-between  md:w-1/2 mx-auto">
        <span>Made by Tech Trio </span>
        <ul className="flex gap-4">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </ul>
        </div>
        
      </nav>
    </>
  );
}

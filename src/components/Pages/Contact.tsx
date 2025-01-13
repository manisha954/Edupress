import Footer from "../LandingPagesUi/Footer";
import Navbar from "../LandingPagesUi/Navbar";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-4 md:px-14 items-center pt-24 mb-12 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          <div className="md:col-span-1">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Need A Direct Line?
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Cras massa et odio donec faucibus in. Vitae pretium massa dolor
              ullamcorper lectus elit quam.
            </p>
            <div className="flex items-center mb-4">
              <div className="w-6 mr-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                  <path
                    fill="#f99b16"
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-sm text-gray-600 mb-1">Phone</h1>
                <span className="text-gray-800 font-semibold text-sm">
                  (123) 456 7890
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 mr-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                  <path
                    fill="#f99b16"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="mb-1 text-sm text-gray-600">Email</h1>
                <span className="text-gray-800 font-semibold text-sm">
                  contact@thimpress.com
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d80082.73735858014!2d84.27137100369625!3d27.98145219337048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1735579449985!5m2!1sen!2snp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
        <div className="mt-14 w-full px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Contact Us
          </h2>
          <p className="mb-6 text-gray-600 text-base">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                className="px-4 py-2 text-sm border active:border-orange-500 border-gray-300 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                className="px-4 py-2 text-sm border active:border-orange-500 border-gray-300 rounded-lg"
                required
              />
            </div>
            <textarea
              name="comment"
              placeholder="Comment"
              className="px-4 py-2 border text-sm active:border-orange-500 border-gray-300 rounded-lg"
              required
            ></textarea>
            <div className="flex items-center">
              <input type="checkbox" id="saveInfo" className="mr-2" />
              <label htmlFor="saveInfo" className="text-sm text-gray-600">
                Save my name, email in this browser for the next time I comment.
              </label>
            </div>
            <input
              type="submit"
              value="Posts Comment"
              className="px-2 py-3 w-40 text-sm font-semibold  hover:text-orange-500 hover:bg-transparent hover:border-orange-500 border-2 active:border-orange-500 border-gray-300 rounded-full bg-orange-500 text-white cursor-pointer"
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

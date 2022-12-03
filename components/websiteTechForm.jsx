import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function WebsiteTechForm({ addWebsite }) {
  const [websiteInfo, setWebsiteInfo] = useState({
    website: '',
  });

  const handleUpdate = (event) => {
    setWebsiteInfo({ ...websiteInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();

    const headers = new Headers({
      'x-api-key': 'gerardo-x-key',
      'Content-Type': 'application/json',
    });
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        website: websiteInfo.website,
      }),
      redirect: 'follow',
    };
    const url = process.env.NEXT_PUBLIC_REST ?? 'https://built-with-j22xtuwt4a-uc.a.run.app';
    await fetch(`${url}/api/analyze/`, requestOptions)
      .then((response) => response.json())
      .then((result) => addWebsite(result.technologies))
      .catch(() => addWebsite([]));
    setWebsiteInfo({ website: '' });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Identify technologies on your website</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Find out the technology stack of your website.
          We will recommend solutions given your needs.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter your website here:
              <input
                type="text"
                id="website"
                name="website"
                placeholder="Website URL"
                value={websiteInfo.website}
                onChange={handleUpdate}
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

WebsiteTechForm.propTypes = {
  addWebsite: PropTypes.func,
};
WebsiteTechForm.defaultProps = {
  addWebsite: undefined,
};

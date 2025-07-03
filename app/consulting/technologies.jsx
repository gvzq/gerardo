import React, { useState } from "react";
import { Card, Spinner } from "flowbite-react";
import Image from "next/image";

export default function Technologies() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [websiteInfo, setWebsiteInfo] = useState({
    website: "",
  });

  const handleUpdate = (event) => {
    setWebsiteInfo({ ...websiteInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();

    const headers = new Headers({
      "x-api-key": "gerardo-x-key",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    });
    const requestOptions = {
      mode: "no-cors",
      method: "POST",
      headers,
      body: JSON.stringify({
        website: websiteInfo.website,
      }),
    };
    setLoading(true);

    const url = process.env.NEXT_PUBLIC_DOMAIN;
    await fetch(`${url}/api/wappalyzer`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
      });
    setWebsiteInfo({ website: "" });
  };

  return (
    <div className="h-full">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Identify technologies on your website
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Find out the technology stack of your website. We will recommend
            solutions given your needs.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isLoading ? (
                  <>
                    <Spinner aria-label="Spinner button example" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {data.technologies !== undefined && !isLoading && (
        <>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            {data.description}
          </p>
          <div className="container mx-auto p-6 grid grid-cols-3 gap-4">
            {data?.technologies.map((el) => (
              <div
                className="col-span-1 flex flex-col bg-white p-4"
                key={el.slug}
              >
                <Card>
                  <h5 className="mb-2 font-bold text-2xl">
                    <Image
                      src={`https://raw.githubusercontent.com/enthec/webappanalyzer/main/src/images/icons/${el.icon}`}
                      className="object-contain h-24 w-24"
                      width={0}
                      height={0}
                      alt={`${el.name} Logo`}
                      onError={({ currentTarget }) => {
                        /* eslint no-param-reassign: "error" */
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://via.placeholder.com/150/FFFFFF/?text=Gera";
                      }}
                    />
                    {el.name}
                  </h5>
                  <p className="font-normal text-md text-gray-700 dark:text-gray-400">
                    {el?.description && el.description.length > 100
                      ? `${el.description.substring(0, 97)}...`
                      : el.description}
                  </p>
                  <div className="flex flex-wrap mt-auto pt-3 text-xs">
                    {el.categories.map((category) => (
                      <p
                        className="mr-2 mb-2"
                        key={`${el.name}-${category.name}`}
                      >
                        {category.name}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

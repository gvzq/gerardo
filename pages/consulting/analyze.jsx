import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import WebsiteTechForm from '../../components/websiteTechForm';

export default function Analyze() {
  const [technologies, setTechnologies] = useState([]);

  const addTechnologies = (websiteInfo) => {
    setTechnologies(websiteInfo);
  };

  return (
    <div className="h-full">
      <WebsiteTechForm addWebsite={addTechnologies} />
      <div className="container mx-auto p-6 grid grid-cols-3 gap-4">
        {technologies.map((el) => (
          <div className="col-span-1 flex flex-col bg-white p-4" key={el.slug}>
            <Card>
              <h5 className="mb-2 font-bold text-2xl">
                <img
                  src={`https://raw.githubusercontent.com/wappalyzer/wappalyzer/master/src/drivers/webextension/images/icons/${el.icon}`}
                  className="object-contain h-24 w-24"
                  alt={`${el.name} Logo`}
                  onError={({ currentTarget }) => {
                    /* eslint no-param-reassign: "error" */
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://via.placeholder.com/150/FFFFFF/?text=Gera';
                  }}
                />
                {el.name}
              </h5>
              <p className="font-normal text-md text-gray-700 dark:text-gray-400">
                {el.description}
              </p>
              <div className="flex flex-wrap mt-auto pt-3 text-xs">
                {el.categories.map((category) => (
                  <p className="mr-2 mb-2">{category.name}</p>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

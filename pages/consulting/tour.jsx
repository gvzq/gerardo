import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Button } from 'flowbite-react';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

export default function Tour() {
  const router = useRouter();
  let { company } = router.query;

  if (company) {
    company = company
      .replaceAll('-', ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  }

  const [run, setRun] = useState(false);

  const steps = [
    {
      content: "Let's begin your UX journey!",
      placement: 'center',
      target: 'body',
    },
    {
      content: 'Step1',
      placement: 'bottom',
      title: 'Our projects',
      target: '#step1',
    },
  ];

  const handleClickStart = (event) => {
    event.preventDefault();
    setRun(true);
  };
  const handleJoyrideEnd = (data) => {
    const { status } = data;
    if (status.FINISHED || status.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <div className="h-full">
      <Joyride
        continuous
        hideCloseButton
        showSkipButton
        steps={steps}
        run={run}
        callback={handleJoyrideEnd}
      />
      <Button onClick={handleClickStart}>
        {'Start '}
        {company}
      </Button>

      <div className="h-screen" id="step1">
        Step 1
      </div>
      <div className="h-screen">
        <h2>Step 2</h2>
      </div>
      <div className="h-50">
        <h2>Step 3</h2>
      </div>
      <div className="h-50">Step 4</div>
    </div>
  );
}

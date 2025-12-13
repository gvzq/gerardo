"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="h-full bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
            <p className="text-base leading-relaxed">
              Colonist+ takes your privacy seriously. Colonist+ does not collect
              any data from users. This privacy policy explains how Colonist+
              operates and what information is stored on your computer.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                No Data Collection
              </h2>
              <p className="text-base leading-relaxed">
                Colonist+ does not collect any personal data, user activity,
                browsing history, or any other information about you. The
                extension operates entirely on your computer with no data
                transmission to external servers or third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Local Storage Only
              </h2>
              <p className="text-base leading-relaxed mb-4">
                Colonist+ only stores the following information locally on your
                computer using Chrome&apos;s storage API:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>
                  <strong>Custom Avatar URL</strong>: The image URL you choose
                  for your player avatar
                </li>
                <li>
                  <strong>Player Color</strong>: Your preferred player color
                  indicator
                </li>
              </ul>
              <p className="text-base leading-relaxed mt-4">
                This data is stored exclusively on your device and never
                transmitted to external servers, cloud services, or third
                parties. All information remains completely private on your
                computer.
              </p>
              <p className="text-base leading-relaxed mt-4">
                You can delete this stored data anytime by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base mt-2">
                <li>Clearing your browser&apos;s extension storage</li>
                <li>Uninstalling the Colonist+ extension</li>
                <li>Resetting your browser settings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                No Cookies
              </h2>
              <p className="text-base leading-relaxed">
                Colonist+ does not use cookies. All user preferences are stored
                locally on your computer through Chrome&apos;s storage API only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                What Colonist+ Does NOT Do
              </h2>
              <p className="text-base leading-relaxed mb-4">
                Colonist+ does not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>Collect any personal data</li>
                <li>Share data with third parties</li>
                <li>Track user activity or behavior</li>
                <li>Monitor web history or browsing habits</li>
                <li>Access authentication credentials or passwords</li>
                <li>Send data to external servers or cloud services</li>
                <li>Use analytics or tracking tools</li>
                <li>Collect IP addresses or device information</li>
              </ul>
              <p className="text-base leading-relaxed mt-4">
                The extension only accesses content on Colonist.io to perform
                its intended functions (ad removal, avatar customization, and
                player color customization).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Remote Resources
              </h2>
              <p className="text-base leading-relaxed">
                The extension includes code to load an external audio file from{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  https://eleven-public-cdn.elevenlabs.io/
                </code>{" "}
                for audio replacement functionality. This feature is currently
                disabled by default and will not execute unless explicitly
                enabled. When disabled, no remote resources are accessed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Links to Third Party Websites
              </h2>
              <p className="text-base leading-relaxed">
                Colonist+ operates on Colonist.io. We are not responsible for
                the privacy policies of Colonist.io or any other third-party
                websites. You should be aware that the privacy policies of
                other websites may differ from our own.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Security
              </h2>
              <p className="text-base leading-relaxed">
                The security of your personal information is important to us.
                All data stored by Colonist+ is stored locally in your browser.
                No data is transmitted over the Internet or to external servers.
                Your stored preferences remain private within your browser and
                cannot be accessed by websites or other extensions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-base leading-relaxed">
                This Privacy Policy is effective as of December 13, 2025 and
                will remain in effect except with respect to any changes in its
                provisions in the future, which will be in effect immediately
                after being posted on this page.
              </p>
              <p className="text-base leading-relaxed mt-4">
                We reserve the right to update or change our Privacy Policy at
                any time. You should check this Privacy Policy periodically. If
                we make any material changes to this Privacy Policy, we will
                notify you by updating the extension or placing a prominent
                notice in the extension listing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Contact Information
              </h2>
              <p className="text-base leading-relaxed">
                For any questions or concerns regarding this privacy policy,
                please visit the extension&apos;s support page or contact us through
                the Chrome Web Store extension listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

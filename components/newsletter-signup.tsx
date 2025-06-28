"use client";

import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // For now, just simulate a successful subscription
      // In a real implementation, you would call your Ghost Members API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage("Email sent! Check your inbox to complete your signup.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="gh-subscribe">
      <div className="gh-subscribe-content">
        <h2 className="gh-subscribe-title">Sign up for fCTO Labs</h2>
        <p className="gh-subscribe-description">Thoughts, stories and ideas.</p>

        {status === "success" ? (
          <div className="gh-subscribe-success">
            <p>{message}</p>
          </div>
        ) : (
          <form className="gh-subscribe-form" onSubmit={handleSubmit}>
            <div className="gh-subscribe-form-group">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="gh-subscribe-input"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="gh-subscribe-btn"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status === "error" && (
              <p className="gh-subscribe-error">{message}</p>
            )}
          </form>
        )}

        <p className="gh-subscribe-disclaimer">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}

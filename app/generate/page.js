"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const Shorten = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setgenerated] = useState("");
  // const handleChange = (e) => {};
  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shorturl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return { ok: response.ok, data };
        }
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}`);
      })
      .then(({ ok, data }) => {
        console.log(data);
        if (ok && data.success) {
          const host = process.env.NEXT_PUBLIC_HOST || window.location.origin;
          const hostWithSlash = host.endsWith("/") ? host : `${host}/`;
          setgenerated(`${hostWithSlash}${shorturl}`);
          alert(data.message);
          seturl("");
          setshorturl("");
        } else {
          alert(data.message || "Failed to generate URL.");
        }
      })
      .catch((error) => {
        console.error("Error generating URL:", error);
        alert("An error occurred: " + error.message);
      });
  };
  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">generate your short URLs</h1>
      <div className="flex flex-col gap-2">
        <input
          className="px-4 py-4 focus:outline-purple-700 bg-white rounded-full"
          value={url}
          type="text"
          placeholder="enter your URL here"
          onChange={(e) => {
            seturl(e.target.value);
          }}
        />
        <input
          className="px-4 py-4 focus:outline-purple-700 bg-white rounded-full"
          value={shorturl}
          type="text"
          placeholder="enter your preferred short URL text here"
          onChange={(e) => {
            setshorturl(e.target.value);
          }}
        />
        <button
          onClick={generate}
          className="text-purple-500 shadow-lg p-3 rounded-full font-bold py-1 bg-white my-3"
        >
          generate
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {generated && (
          <>
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-bold text-lg">
                  your generated url is:
                </span>
              </p>
              <code>
                <Link href={generated} target="_blank">
                  {generated}
                </Link>
                {/* <a
                  href={`${process.env.NEXT_LOCALHOST}/${shorturl}`}
                  target="_blank"
                >
                  {`${process.env.NEXT_LOCALHOST}/${shorturl}`}
                </a> */}
              </code>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shorten;

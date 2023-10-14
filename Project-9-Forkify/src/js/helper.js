/*
    In this file we will put a couple of functions that we reuse in our project.
*/

import { TIMEOUT_SECOND } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    // As soon as any of these promises here in the race rejects or fulfills then that promise will become the winner
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECOND)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

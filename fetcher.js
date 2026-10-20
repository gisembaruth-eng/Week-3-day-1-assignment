function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function resilientFetch(url) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    console.log(`Attempt ${attempt} of 3 for ${url}...`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt === 3) {
        return {
          success: false,
          error: "Failed after 3 attempts",
          url,
          attempts: 3,
        };
      }
      await delay(1000);
    }
  }

  throw new Error("Fetch retry loop exited unexpectedly.");
}

async function testResilientFetch(url) {
  const result = await resilientFetch(url);
  if (result && result.success === false) {
    console.log(`❌ Failed: ${JSON.stringify(result)}\n`);
  } else {
    console.log(`✅ Success: ${JSON.stringify(result)}\n`);
  }
}

async function runFetcherDemo() {
  await testResilientFetch("https://jsonplaceholder.typicode.com/posts/1");
  await testResilientFetch(
    "https://jsonplaceholder.typicode.com/invalid-endpoint-that-404s",
  );
}

runFetcherDemo().catch((error) => {
  console.error("Fetcher demo failed:", error);
  process.exitCode = 1;
});

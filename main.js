const main = async () => {
  const response = await fetch(
    "https://magenta-total-silkworm-431.mypinata.cloud/ipfs/bafkreifjycl4wbebxbt7s3l2uel5dp3uzbeurqzojm63mseoofx5vgtgyy"
  );
  const metadata = await response.json();
  console.log(metadata);
};

await main();

async function fetchWithCurl() {
  const command = new Deno.Command("curl", {
    args: [
      "-s", // Silent mode: no progress bar
      "-A",
      "Mozilla/5.0", // User-Agent to mimic a browser
      "https://www.parcjeandrapeau.com/fr/sentier-des-patineurs-patinoire-patin-glace-activite-hiver-montreal/",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout, stderr } = await command.output();

  if (stderr.length) {
    console.error("Curl Error:", new TextDecoder().decode(stderr));
  } else {
    console.log(new TextDecoder().decode(stdout)); // Only page content here
  }
}

fetchWithCurl();

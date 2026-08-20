export async function generateProject(configuration) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(configuration),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Failed to generate project."
    );
  }

  return data;
}
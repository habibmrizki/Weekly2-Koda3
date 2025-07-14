export async function runTask3() {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    const user = data.map((el) => {
      return {
        name: el.name,
        address: el.address.city,
      };
    });
    user.sort((a, b) => a.address.localeCompare(b.address));
    console.log(user);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
}

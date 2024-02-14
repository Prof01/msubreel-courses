
export default async function fetchData(url) {
    const res = await fetch('https://udd-backend.onrender.com'+url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
        // console.log(process.env.BACK_END+url);
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
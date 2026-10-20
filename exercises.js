console.log("=== Destructuring ===");

const person = { name: "Amina", age: 24, city: "Nairobi" };
const { name, age } = person;
console.log(`1. Name: ${name}, age: ${age}`);

const { name: fullName } = person;
console.log(`2. Full name: ${fullName}`);

const student = { name: "Brian" };
const { role = "student" } = student;
console.log(`3. Role: ${role}`);

const resident = {
  name: "Lilian",
  address: { city: "Mombasa", county: "Mombasa", zip: "80100" },
};
const {
  address: { city, county },
} = resident;
console.log(`4. City: ${city}, county: ${county}`);

const cities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
const [firstCity, , thirdCity] = cities;
console.log(`5. First: ${firstCity}, third: ${thirdCity}`);

console.log("\n=== Spread ===");

const mergedNumbers = [...[1, 2, 3], ...[4, 5, 6]];
console.log(`1. Merged arrays: ${mergedNumbers.join(", ")}`);

const originalProfile = { name: "Amina", city: "Nairobi" };
const updatedProfile = { ...originalProfile, city: "Mombasa" };
console.log(
  `2. Original city: ${originalProfile.city}, copied city: ${updatedProfile.city}`,
);

const numbers = [4, 12, 7, 19, 3];
console.log(`3. Maximum: ${Math.max(...numbers)}`);

const mergedObject = { ...{ a: 1, b: 2 }, ...{ b: 3, c: 4 } };
console.log(`4. Merged objects: ${JSON.stringify(mergedObject)}`);

const originalItems = ["middle"];
const extendedItems = ["beginning", ...originalItems, "end"];
console.log(`5. Added at both ends: ${extendedItems.join(", ")}`);

console.log("\n=== Rest ===");

function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}
console.log(`1. Sum: ${sum(1, 2, 3, 4, 5)}`);

function greet(first, ...others) {
  return `Hello, ${first}${others.length ? ` and ${others.join(", ")}` : ""}!`;
}
console.log(`2. Greeting: ${greet("Amina", "Brian", "Lilian")}`);

const personWithDetails = { name: "Amina", age: 24, city: "Nairobi" };
const { name: personName, ...details } = personWithDetails;
console.log(`3. Name: ${personName}, details: ${JSON.stringify(details)}`);

function head(first, ...rest) {
  return { first, rest };
}
const headResult = head("Nairobi", "Mombasa", "Kisumu");
console.log(`4. Head: ${headResult.first}, rest: ${headResult.rest.join(", ")}`);

function logFirstAndCount(first, ...remaining) {
  console.log(`5. First: ${first}, remaining: ${remaining.length}`);
}
logFirstAndCount("Amina", "Brian", "Lilian", "James");

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(`Cache HIT for args: ${key}`);
      return cache.get(key);
    }

    console.log(`Cache MISS for args: ${key} — computing...`);
    const result = fn.apply(this, args);
    cache.set(key, result);

    if (result && typeof result.then === "function") {
      result.catch(() => cache.delete(key));
    }

    return result;
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const slowFactorial = memoize(async function factorial(number) {
  await delay(250);
  let result = 1;
  for (let factor = 2; factor <= number; factor += 1) {
    result *= factor;
  }
  return result;
});

async function runMemoizationDemo() {
  console.log("\n=== Bonus: Memoization ===");
  console.log(`5! = ${await slowFactorial(5)}`);
  console.log(`5! again = ${await slowFactorial(5)}`);
}

runMemoizationDemo().catch((error) => {
  console.error("Memoization demo failed:", error);
  process.exitCode = 1;
});

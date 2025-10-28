
/**
 * This function must add two numbers and return sum of numbers
 * @param a {number|string}
 * @param b {number|string}
 * @returns {number}
 */
function sum(a, b) {
  return Number(a) + Number(b)
}

/**
 * This function takes a number and raises it to a power
 * @param x
 * @param n
 * @returns {number}
 */
function pow(x, n) {
  let result = 1;
  // Якщо степінь від'ємна
  if (n < 0) {
    for (let i = 0; i < -n; i++) {
      result *= x;
    }
    return 1 / result;
  }
  // Якщо степінь додатна або нульова
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

/**
 * This function calculate factorial of number
 * @param n {number}
 * @returns {number}
 */
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
};

/**
 * This function calculate Fibonacci sequence
 * @param n
 * @returns {*|number}
 */
function fibonacci(n) {
  return (n > 2) ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
}

/**
 * This function must remove some element for array of string by name
 * @param list {string[]}
 * @param name {string}
 * @returns {string[]}
 */
function removeByName(list, name) {
  let result = [...list]
  let index = result.indexOf(name);
  if (index !== -1) {
    result.splice(index, 1);
  }

  return result;
}

/**
 * This function create counter
 * @param currentCount {number}
 * @returns {function(): number}
 */
function makeCounter(currentCount) {
  return function () {
    return currentCount++;
  };
}

/**
 * This function create async timeout and return unixtime like timer Id
 * @param time {number}
 * @returns {number}
 */

function getAsyncTimerId(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timerId = Math.floor(Date.now() / 1000);
      resolve(timerId);
    }, time);
  });
}


/**
 * This function return promise and multiply paraments
 * @param x{number}
 * @returns {Promise<number>}
 */
async function asyncMultiply(x) {
  return new Promise(resolve => {
    setTimeout(resolve, 3000, 2 * x);
  });
};

/**
 * This function create GET http request to server
 * @param url {string}
 * @returns {Promise<unknown>}
 */
function httpGet(url) {

  return new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}

// Тестована функція
function wgs84ToMGRS(latitude, longitude, accuracy = 5) {
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new Error("Некоректні координати WGS84");
  }
  return mgrs.forward([longitude, latitude], accuracy);
}

// lib.js

/**
 * Convert lat/lon to MGRS using the global mgrs library.
 * @param {[number, number]} ll [longitude, latitude]
 * @param {number} [accuracy=5]
 * @returns {string}
 */
function convertWgs84ToMGRS(ll, accuracy) {
  accuracy = typeof accuracy === 'number' ? accuracy : 5; // default accuracy 1m

  if (!Array.isArray(ll)) {
    throw new TypeError('forward did not receive an array');
  }

  if (typeof ll[0] === 'string' || typeof ll[1] === 'string') {
    throw new TypeError('forward received an array of strings, but it only accepts an array of numbers.');
  }

  const [ lon, lat ] = ll;
  if (lon < -180 || lon > 180) {
    throw new TypeError(`forward received an invalid longitude of ${lon}`);
  }
  if (lat < -90 || lat > 90) {
    throw new TypeError(`forward received an invalid latitude of ${lat}`);
  }

  if (lat < -80 || lat > 84) {
    throw new TypeError(`forward received a latitude of ${lat}, but this library does not support conversions of points in polar regions below 80°S and above 84°N`);
  }

  // Використовуємо mgrs (підключений через CDN у index.html)
  return mgrs.forward([lon, lat], accuracy);
}

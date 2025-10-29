/* global mgrs, chai, describe, it */
const { expect } = chai;

describe("convertWgs84ToMGRS", function() {

  it('повертає правильний формат MGRS', () => {
    const result = convertWgs84ToMGRS([36.2304, 49.9935]); // Харків
    expect(result).to.be.a('string');
    expect(result).to.match(/^\d{1,2}[C-X][A-Z]{2}\d+$/);
  });

  it('коректно конвертує основні українські міста', () => {
    const cities = {
      Izium: [37.2566, 49.2103],
      Kramatorsk: [37.5843, 48.7389],
      Melitopol: [35.3667, 46.8333],
      Orikhiv: [35.7876, 47.5672],
      Chernihiv: [31.2893, 51.4982],
      Sumy: [34.8003, 50.9216],
      Kharkiv: [36.2304, 49.9935],
    };

    for (const [name, [lon, lat]] of Object.entries(cities)) {
      const mgrsCode = convertWgs84ToMGRS([lon, lat]);
      const expected = mgrs.forward([lon, lat], 5);
      expect(mgrsCode).to.equal(expected, `Помилка для міста ${name}`);
    }
  });

  it('кидає помилку при неправильному типі аргументів', () => {
    expect(() => convertWgs84ToMGRS('abc')).to.throw(TypeError);
    expect(() => convertWgs84ToMGRS(['36.2', '49.9'])).to.throw(TypeError);
  });

  it('кидає помилку при неправильних координатах', () => {
    expect(() => convertWgs84ToMGRS([200, 50])).to.throw(TypeError);
    expect(() => convertWgs84ToMGRS([30, 95])).to.throw(TypeError);
    expect(() => convertWgs84ToMGRS([30, -85])).to.throw(TypeError);
  });

});
    // // ВАЛІДНІ ДАНІ: Стандартні конвертації та точність

    // it("повинен конвертувати координати Києва (центральна точка) у MGRS з точністю 1м", function() {
    //     const kyivLL = [30.5234, 50.4501];
    //     const expected = mgrs.forward(kyivLL, 5); // 36U YK 75253 58515
    //     const actual = convertWgs84ToMGRS(kyivLL, 5);
    //     assert.equal(actual, expected, "Конвертація Києва повинна збігатися з mgrs.forward()");
    //     console.log("Київ (1м) →", actual);
    // });

    // it("повинен використовувати точність за замовчуванням (5) якщо її не вказано", function() {
    //     const testLL = [30.5234, 50.4501];
    //     const expected = mgrs.forward(testLL, 5);
    //     const actual = convertWgs84ToMGRS(testLL); // Без вказівки accuracy
    //     assert.equal(actual, expected, "Повинна використовуватись точність 5 за замовчуванням");
    // });

    // it("повинен конвертувати координати з точністю 10м (accuracy=4)", function() {
    //     const testLL = [4.895168, 52.370216]; // Амстердам
    //     const expected = mgrs.forward(testLL, 4); // 31U FM 6271 0500
    //     const actual = convertWgs84ToMGRS(testLL, 4);
    //     assert.equal(actual, expected, "Конвертація з accuracy=4 повинна бути коректною");
    //     console.log("Амстердам (10м) →", actual);
    // });

    // it("повинен конвертувати координати з точністю 1км (accuracy=2)", function() {
    //     const testLL = [-74.0060, 40.7128]; // Нью-Йорк
    //     const expected = mgrs.forward(testLL, 2); // 18T WL 80 43
    //     const actual = convertWgs84ToMGRS(testLL, 2);
    //     assert.equal(actual, expected, "Конвертація з accuracy=2 повинна бути коректною");
    //     console.log("Нью-Йорк (1км) →", actual);
    // });

    // // ОБРОБКА ПОМИЛОК: Невалідні вхідні дані

    // it("повинен викинути TypeError, якщо вхідні дані не є масивом", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS("не масив");
    //     }, TypeError, 'forward did not receive an array', "Помилка при не-масиві");
    // });

    // it("повинен викинути TypeError, якщо масив містить рядки", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS(["30.5234", 50.4501]);
    //     }, TypeError, 'received an array of strings', "Помилка при рядках");
    // });

    // // ОБРОБКА ПОМИЛОК: Невалідні значення широти/довготи

    // it("повинен викинути TypeError для невалідного значення довготи (> 180)", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS([180.0001, 50]);
    //     }, TypeError, 'invalid longitude', "Помилка при lon > 180");
    // });

    // it("повинен викинути TypeError для невалідного значення довготи (< -180)", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS([-180.0001, 50]);
    //     }, TypeError, 'invalid longitude', "Помилка при lon < -180");
    // });

    // it("повинен викинути TypeError для невалідного значення широти (> 90)", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS([30, 90.0001]);
    //     }, TypeError, 'invalid latitude', "Помилка при lat > 90");
    // });

    // // ОБРОБКА ПОМИЛОК: Полярні регіони (обмеження бібліотеки)

    // it("повинен викинути TypeError для широти вище 84°N", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS([0, 84.0000001]);
    //     }, TypeError, 'polar regions', "Помилка при lat > 84");
    // });

    // it("повинен викинути TypeError для широти нижче 80°S", function() {
    //     assert.throws(() => {
    //         convertWgs84ToMGRS([0, -80.0000001]);
    //     }, TypeError, 'polar regions', "Помилка при lat < -80");
    // });
    
    // // КРАЙНІ ЗНАЧЕННЯ: Кордони системи

    // it("повинен коректно обробляти координати на екваторі (lat=0)", function() {
    //     const testLL = [30, 0];
    //     const expected = mgrs.forward(testLL, 5); // 36N TL 50000 00000
    //     const actual = convertWgs84ToMGRS(testLL, 5);
    //     assert.equal(actual, expected, "Конвертація на екваторі");
    // });

    // it("повинен коректно обробляти максимальну широту (lat=84)", function() {
    //     const testLL = [30, 84];
    //     const expected = mgrs.forward(testLL, 5); // 36X VF 50000 00000
    //     const actual = convertWgs84ToMGRS(testLL, 5);
    //     assert.equal(actual, expected, "Конвертація на кордоні 84°N");
    // });

    // it("повинен коректно обробляти мінімальну широту (lat=-80)", function() {
    //     const testLL = [30, -80];
    //     const expected = mgrs.forward(testLL, 5); // 36C TV 50000 00000
    //     const actual = convertWgs84ToMGRS(testLL, 5);
    //     assert.equal(actual, expected, "Конвертація на кордоні 80°S");
    // });


describe('sum', () => {
  it('перевірка на додавання позитивних та негативних чисел', () => {
    assert.equal(sum(2, -3), -1);
    assert.equal(sum(2, -3), -1);
    assert.equal(sum(-2, -3), -5);
    assert.equal(sum(-2, 3), 1);
    assert.equal(sum(0, 0), 0);
  });
  it('первірка функції додвання, якщо число буде строкою', () => {
    assert.equal(sum('2', '-3'), -1);
    assert.equal(sum('-2', '3'), 1);
    assert.equal(sum('0', 0), 0);
    assert.equal(sum('4', 0), 4);
  });
  it('первірка функції додвання, якщо числа бдуть з плаваючою крапкою', () => {
    assert.equal(sum('2.6', '2.4'), 5);
    assert.equal(sum('-2.6', 1.1), -1.5);
    assert.equal(sum('-1.1', -1.1), -2.2);
  });
});

describe('pow', () => {
  it('піднесення до додатного степеня', () => {
    assert.equal(pow(2, 3), 8);
    assert.equal(pow(5, 2), 25);
    assert.equal(pow(3, 1), 3);
    assert.equal(pow(10, 4), 10000);
  });

  it('піднесення до нульового степеня', () => {
    assert.equal(pow(2, 0), 1);
    assert.equal(pow(-3, 0), 1);
    assert.equal(pow(0, 0), 1); // за замовчуванням в JS 0**0 = 1
  });

  it('піднесення від’ємних чисел до додатного степеня', () => {
    assert.equal(pow(-2, 1), -2);
    assert.equal(pow(-2, 2), 4);
    assert.equal(pow(-2, 3), -8);
    assert.equal(pow(-3, 4), 81);
  });

  it('піднесення до від’ємного степеня', () => {
    assert.equal(pow(2, -2), 0.25);
    assert.equal(pow(2, -3), 0.125);
    assert.equal(pow(-2, -3), -0.125);
    assert.equal(pow(-2, -2), 0.25);
  });

  it('перевірка для нуля', () => {
    assert.equal(pow(0, 1), 0);
    assert.equal(pow(0, 5), 0);
  });

  it('числа передані як строки', () => {
    assert.equal(pow('2', '3'), 8);
    assert.equal(pow('5', '2'), 25);
    assert.equal(pow('-2', '3'), -8);
    assert.equal(pow('-2', '-2'), 0.25);
  });

  it('великі степені', () => {
    assert.equal(pow(2, 10), 1024);
    assert.equal(pow(10, 6), 1000000);
  });

  it('граничні випадки', () => {
    assert.equal(pow(1, 1000), 1);
    assert.equal(pow(-1, 999), -1);
    assert.equal(pow(-1, 1000), 1);
  });
});


describe('factorial', () => {
  it('обчислення факторіала додатних чисел', () => {
    assert.equal(factorial(1), 1);    
    assert.equal(factorial(2), 2);     
    assert.equal(factorial(3), 6);     
    assert.equal(factorial(4), 24);    
    assert.equal(factorial(5), 120);   
  });

  it('перевірка великих чисел', () => {
    assert.equal(factorial(10), 3628800);
    assert.equal(factorial(12), 479001600);
  });

  it('повинна повертати 1 при n = 0 або n = 1', () => {
    assert.equal(factorial(0), 1);
    assert.equal(factorial(1), 1);
  });
  
  it('повинна кидати помилку при від’ємних числах', () => {
    assert.throws(() => factorial(-1), /Maximum call stack size exceeded/i);
    assert.throws(() => factorial(-5), /Maximum call stack size exceeded/i);
});

describe('fibonacci', () => {

  it('повертає правильні значення для перших чисел ряду Фібоначчі', () => {
    assert.equal(fibonacci(1), 1);
    assert.equal(fibonacci(2), 1); 
    assert.equal(fibonacci(3), 2);
    assert.equal(fibonacci(4), 3);
    assert.equal(fibonacci(5), 5);
    assert.equal(fibonacci(6), 8);
    assert.equal(fibonacci(7), 13);
    assert.equal(fibonacci(8), 21);
  });

  it('перевірка великих чисел ряду', () => {
    assert.equal(fibonacci(10), 55);
    assert.equal(fibonacci(12), 144);
  });

  it('перевірка граничних випадків', () => {
    assert.equal(fibonacci(1), 1);
    assert.equal(fibonacci(2), 1);
  });

  // it('перевірка типів аргументів — рядки з числами', () => {  
  //   assert.throws(() => fibonacci('5'), 5);
  // });
});

describe('removeByName', () => {
  it('повинен видалити існуючий елемент з масиву', () => {
    assert.deepEqual(removeByName(['Alice', 'Bob', 'Charlie'], 'Bob'), ['Alice', 'Charlie']);
  });

  it('повинен видалити лише перше входження, якщо елемент повторюється', () => {
    assert.deepEqual(removeByName(['Anna', 'Bob', 'Anna', 'Charlie'], 'Anna'), ['Bob', 'Anna', 'Charlie']);
  });

  it('повинен повернути масив без змін, якщо елемент не знайдено', () => {
    assert.deepEqual(removeByName(['Alice', 'Bob'], 'Eve'), ['Alice', 'Bob']);
  });

  it('повинен коректно працювати з порожнім масивом', () => {
    assert.deepEqual(removeByName([], 'Bob'), []);
  });

  it('повинен бути нечутливим до типів, тобто рядок "5" ≠ число 5', () => {
    assert.deepEqual(removeByName(['5', '10'], 5), ['5', '10']);
  });

  it('повинен повертати новий масив, не змінюючи оригінальний', () => {
    const list = ['Alice', 'Bob', 'Charlie'];
    const result = removeByName(list, 'Bob');
    assert.deepEqual(result, ['Alice', 'Charlie']);
    assert.deepEqual(list, ['Alice', 'Bob', 'Charlie']);
  });

  it('повинен коректно працювати, якщо елемент — порожній рядок', () => {
    assert.deepEqual(removeByName(['', 'Bob', 'Alice'], ''), ['Bob', 'Alice']);
  });

  it('повинен видаляти елемент, навіть якщо він стоїть першим', () => {
    assert.deepEqual(removeByName(['Target', 'Alice', 'Bob'], 'Target'), ['Alice', 'Bob']);
  });

  it('повинен видаляти елемент, навіть якщо він останній', () => {
    assert.deepEqual(removeByName(['Alice', 'Bob', 'Target'], 'Target'), ['Alice', 'Bob']);
  });

  it('повинен коректно працювати, якщо масив має лише один елемент', () => {
    assert.deepEqual(removeByName(['Bob'], 'Bob'), []);
    assert.deepEqual(removeByName(['Bob'], 'Alice'), ['Bob']);
  });
});


describe('makeCounter', () => {

  it('повинен створювати лічильник, що починається з переданого значення', () => {
    const counter = makeCounter(5);
    assert.equal(counter(), 5);
    assert.equal(counter(), 6);
    assert.equal(counter(), 7);
  });

  it('кожен новий лічильник має власний незалежний стан', () => {
    const counterA = makeCounter(0);
    const counterB = makeCounter(10);

    assert.equal(counterA(), 0);
    assert.equal(counterA(), 1);
    assert.equal(counterB(), 10);
    assert.equal(counterB(), 11);
    assert.equal(counterA(), 2);
  });

  it('повинен працювати навіть з від’ємним початковим значенням', () => {
    const counter = makeCounter(-3);
    assert.equal(counter(), -3);
    assert.equal(counter(), -2);
    assert.equal(counter(), -1);
  });

  it('повинен працювати з нульовим початковим значенням', () => {
    const counter = makeCounter(0);
    assert.equal(counter(), 0);
    assert.equal(counter(), 1);
  });

  it('повинен повертати число при кожному виклику', () => {
    const counter = makeCounter(2);
    assert.strictEqual(typeof counter(), 'number');
    assert.strictEqual(typeof counter(), 'number');
  });

  it('повинен не змінювати початковий аргумент після створення нового лічильника', () => {
    let start = 5;
    const counter = makeCounter(start);
    counter();
    counter();
    assert.equal(start, 5); // змінна "start" не змінюється
  });

  it('повинен інкрементувати значення на 1 при кожному виклику', () => {
    const counter = makeCounter(100);
    assert.equal(counter(), 100);
    assert.equal(counter(), 101);
    assert.equal(counter(), 102);
  });

  it('повинен зберігати стан між викликами (через замикання)', () => {
    const counter = makeCounter(3);
    counter(); // 3
    counter(); // 4
    assert.equal(counter(), 5); // підтвердження, що стан зберігається
  });

});




// describe('getAsyncTimerId', () => {

//   it('повинен повертати Promise', () => {
//     const result = getAsyncTimerId(100);
//     assert.ok(result instanceof Promise);
//   });

//   it('повинен повертати число (Unix час у секундах)', async () => {
//     const id = await getAsyncTimerId(50);
//     assert.strictEqual(typeof id, 'number');
//   });

//   it('повинен повертати значення, яке приблизно дорівнює поточному Unix часу', async () => {
//     const before = Math.floor(Date.now() / 1000);
//     const id = await getAsyncTimerId(100);
//     const after = Math.floor(Date.now() / 1000);
//     assert.ok(id >= before && id <= after);
//   });

//   it('повинен виконуватися приблизно після заданого часу', async function() {
//     this.timeout(2000); // дозволяємо тесту працювати трохи довше

//     const start = Date.now();
//     await getAsyncTimerId(500);
//     const end = Date.now();

//     const elapsed = end - start;
//     assert.ok(elapsed >= 500, `Очікувалось >= 500мс, отримано ${elapsed}мс`);
//   });

//   it('повинен працювати навіть із нульовою затримкою', async () => {
//     const id = await getAsyncTimerId(0);
//     assert.strictEqual(typeof id, 'number');
//   });

//   it('повинен повертати різні значення при різних запусках у часі', async () => {
//     const id1 = await getAsyncTimerId(10);
//     await new Promise(r => setTimeout(r, 1100)); // чекаємо ~1 секунду
//     const id2 = await getAsyncTimerId(10);

//     assert.notStrictEqual(id1, id2); // Unix-час має змінитися
//   });

//   it('повинен коректно працювати при великих затримках (наприклад, 1 секунда)', async function() {
//     this.timeout(3000);
//     const id = await getAsyncTimerId(1000);
//     assert.strictEqual(typeof id, 'number');
//   });

// });

// describe('asyncMultiply', () => {

//   it('повинна повертати Promise', () => {
//     const result = asyncMultiply(5);
//     assert.ok(result instanceof Promise);
//   });

//   it('повинна повертати подвоєне число після виконання', async function() {
//     this.timeout(4000);
//     const result = await asyncMultiply(4);
//     assert.strictEqual(result, 8);
//   });

//   it('повинна повертати 0, якщо передано 0', async function() {
//     this.timeout(4000);
//     const result = await asyncMultiply(0);
//     assert.strictEqual(result, 0);
//   });

//   it('повинна повертати від’ємне значення, якщо вхідне число від’ємне', async function() {
//     this.timeout(4000);
//     const result = await asyncMultiply(-3);
//     assert.strictEqual(result, -6);
//   });

//   it('повинна повертати правильне значення для чисел із плаваючою крапкою', async function() {
//     this.timeout(4000);
//     const result = await asyncMultiply(2.5);
//     assert.strictEqual(result, 5);
//   });

//   it('повинна виконуватися приблизно через 3 секунди', async function() {
//     this.timeout(5000);
//     const start = Date.now();
//     await asyncMultiply(2);
//     const end = Date.now();
//     const elapsed = end - start;
//     assert.ok(elapsed >= 2900 && elapsed <= 3500, `Фактичний час: ${elapsed} мс`);
//   });

//   it('повинна повертати різні результати для різних вхідних значень', async function() {
//     this.timeout(4000);
//     const res1 = await asyncMultiply(2);
//     const res2 = await asyncMultiply(5);
//     assert.notStrictEqual(res1, res2);
//   });

// });

// describe('httpGet', () => {
//   let xhr;
//   let requests;

//   beforeEach(() => {
//     xhr = sinon.useFakeXMLHttpRequest();
//     requests = [];
//     xhr.onCreate = function (req) {
//       requests.push(req);
//     };
//   });

//   afterEach(() => {
//     xhr.restore();
//   });

//   it('повинна повертати Promise', () => {
//     const result = httpGet('/api/data');
//     expect(result).to.be.instanceOf(Promise);
//   });

//   it('повинна виконуватись успішно при статусі 200', async () => {
//     const promise = httpGet('/api/success');
//     requests[0].respond(200, { "Content-Type": "application/json" }, '{"msg":"OK"}');

//     const response = await promise;
//     expect(response).to.equal('{"msg":"OK"}');
//   });

//   it('повинна відхилятись при статусі 404', async () => {
//     const promise = httpGet('/api/notfound');
//     requests[0].respond(404, { "Content-Type": "text/plain" }, 'Not Found');

//     try {
//       await promise;
//       throw new Error('Очікувалось відхилення');
//     } catch (err) {
//       expect(err).to.be.instanceOf(Error);
//       expect(err.code).to.equal(404);
//     }
//   });

//   it('повинна відхилятись при статусі 500', async () => {
//     const promise = httpGet('/api/error');
//     requests[0].respond(500, { "Content-Type": "text/plain" }, 'Server Error');

//     try {
//       await promise;
//       throw new Error('Очікувалось відхилення');
//     } catch (err) {
//       expect(err.code).to.equal(500);
//       expect(err.message).to.equal('Server Error');
//     }
//   });

//   it('повинна відхилятись при мережевій помилці', async () => {
//     const promise = httpGet('/api/fail');
//     requests[0].error(); // Імітація мережевої помилки

//     try {
//       await promise;
//       throw new Error('Очікувалось відхилення');
//     } catch (err) {
//       expect(err.message).to.equal('Network Error');
//     }
//   });

//   it('повинна викликати xhr.open з правильними параметрами', () => {
//     httpGet('/api/check');
//     const req = requests[0];
//     expect(req.method).to.equal('GET');
//     expect(req.url).to.equal('/api/check');
//   });
// });
});  


describe('sum', () => {
  it('should add positive and negative numbers', () => {
    assert.equal(sum(2, -3), -1);
    assert.equal(sum(-2, -3), -5);
    assert.equal(sum(-2, 3), 1);
    assert.equal(sum(0, 0), 0);
  });
  it('should add numbers and strings', () => {
    assert.equal(sum('2', '-3'), -1);
    assert.equal(sum('-2', '3'), 1);
    assert.equal(sum('0', 0), 0);
  });
});

describe('pow', () => {
  it('should raise x to the n power', () => {
    assert.equal(pow(2, 0), 1);
    assert.equal(pow(0, 5), 0);
    assert.equal(pow(-2, 2), 4);
    assert.equal(pow(-2, 3), -8);
    assert.equal(pow(5, 1), 5);
    assert.equal(pow(1, 100), 1);
  });
});

describe('factorial', () => {
  it('should calculate factorial for positive numbers', () => {
    assert.equal(factorial(0), 1);
    assert.equal(factorial(1), 1);
    assert.equal(factorial(3), 6);
    assert.equal(factorial(5), 120);
  });

  it('should not support negative numbers (should throw error or infinite recursion)', () => {
    // Перевіряємо, що виклик з негативним числом викликає помилку переповнення стеку
    assert.throws(() => factorial(-5), RangeError);
  });
});

describe('fibonacci', () => {
  it('should calculate fibonacci sequence', () => {
    assert.equal(fibonacci(1), 1);
    assert.equal(fibonacci(2), 1);
    assert.equal(fibonacci(6), 8);
    assert.equal(fibonacci(8), 21);
  });
  it('should handle n=0 and negative n', () => {
    assert.equal(fibonacci(0), 1);
    assert.equal(fibonacci(-3), 1);
  });
});

describe('removeByName', () => {
  it('should remove element by name', () => {
    assert.deepEqual(removeByName(['a', 'b', 'c'], 'b'), ['a', 'c']);
    assert.deepEqual(removeByName(['a', 'b', 'b', 'c'], 'b'), ['a', 'b', 'c']);
  });
  it('should not remove if name not found', () => {
    assert.deepEqual(removeByName(['a', 'b', 'c'], 'd'), ['a', 'b', 'c']);
  });
  it('should handle empty array', () => {
    assert.deepEqual(removeByName([], 'a'), []);
  });
});

describe('makeCounter', () => {
  it('should create counter', () => {
    const counter = makeCounter(-2);
    assert.equal(counter(), -2);
    assert.equal(counter(), -1);
    assert.equal(counter(), 0);
    assert.equal(counter(), 1);
  });
});



describe('getAsyncTimerId', () => {
  it('should return a promise that resolves to a number', async function() {
    this.timeout(3000); // Збільшуємо таймаут для асинхронного тесту
    const timerId = await getAsyncTimerId(1000);
    assert.isNumber(timerId);
    assert.isAtLeast(timerId, 0);
  });
});


describe('httpGet', () => {
  it('should return promise', () => {
    const promise = httpGet('https://jsonplaceholder.typicode.com/posts/1');
    assert.equal(typeof promise.then, 'function');
  });
});
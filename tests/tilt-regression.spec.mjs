import {test, expect} from '@playwright/test';

// Keep these names in the existing browser-tilt CI grep; do not add a new filter.
test.beforeEach(async ({page}) => {
  await page.addInitScript(() => {
    const nativeMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = query => query.replace(/\s/g, '') === '(pointer:fine)'
      ? {matches: true, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; }}
      : nativeMatchMedia(query);
  });
  await page.goto('/');
  await expect(page.locator('.project').first()).toHaveAttribute('data-tilt-active', 'false');
});

async function sampleAt(card, x, y) {
  // Read geometry and dispatch in one browser task. A cached Node-side bounding
  // box can become stale between separate protocol round trips.
  return card.evaluate((node, position) => {
    const rect = node.getBoundingClientRect();
    node.dispatchEvent(new PointerEvent('pointermove', {
      bubbles: true,
      clientX: rect.left + rect.width * position.x,
      clientY: rect.top + rect.height * position.y,
    }));
    const style = getComputedStyle(node);
    return {
      x: Number.parseFloat(style.getPropertyValue('--tilt-x')),
      y: Number.parseFloat(style.getPropertyValue('--tilt-y')),
      spotX: Number.parseFloat(style.getPropertyValue('--spot-x')),
      spotY: Number.parseFloat(style.getPropertyValue('--spot-y')),
      active: node.dataset.tiltActive,
    };
  }, {x, y});
}

function expectFiniteBounds(sample) {
  for (const angle of [sample.x, sample.y]) {
    expect(Number.isFinite(angle)).toBe(true);
    expect(Math.abs(angle)).toBeLessThanOrEqual(2.01);
  }
  for (const coordinate of [sample.spotX, sample.spotY]) {
    expect(Number.isFinite(coordinate)).toBe(true);
    expect(coordinate).toBeGreaterThanOrEqual(0);
    expect(coordinate).toBeLessThanOrEqual(100);
  }
}

test('fine-pointer card tilt preserves direction and resets every variable', async ({page}) => {
  const card = page.locator('.project').first();
  for (const [position, expected] of [
    [[0.25, 0.25], [1, -1]],
    [[0.75, 0.75], [-1, 1]],
  ]) {
    const sample = await sampleAt(card, ...position);
    expectFiniteBounds(sample);
    expect(sample.active).toBe('true');
    expect(sample.x).toBeCloseTo(expected[0], 6);
    expect(sample.y).toBeCloseTo(expected[1], 6);
  }
  await card.dispatchEvent('pointerleave');
  await expect(card).toHaveAttribute('data-tilt-active', 'false');
  const reset = await card.evaluate(node => {
    const style = getComputedStyle(node);
    return ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y']
      .map(name => Number.parseFloat(style.getPropertyValue(name)));
  });
  expect(reset).toEqual([0, 0, 50, 50]);
});

test('fine-pointer card tilt clamps out-of-card synthetic coordinates', async ({page}) => {
  const card = page.locator('.project').first();
  for (const [position, expected] of [
    [[-1, 2], [-2, -2, 0, 100]],
    [[2, -1], [2, 2, 100, 0]],
  ]) {
    const sample = await sampleAt(card, ...position);
    expectFiniteBounds(sample);
    expect(sample.active).toBe('true');
    expect([sample.x, sample.y, sample.spotX, sample.spotY]).toEqual(expected);
  }
});

test('fine-pointer card tilt rejects degenerate geometry without stale state', async ({page}) => {
  const card = page.locator('.project').first();
  const samples = await card.evaluate(node => {
    const original = Object.getOwnPropertyDescriptor(node, 'getBoundingClientRect');
    const nativeRect = node.getBoundingClientRect.bind(node);
    const invalid = [
      {left: 0, top: 0, width: 0, height: 100},
      {left: 0, top: 0, width: 100, height: 0},
      {left: 0, top: 0, width: -1, height: 100},
      {left: Infinity, top: 0, width: 100, height: 100},
      {left: 0, top: NaN, width: 100, height: 100},
      {left: 0, top: 0, width: Infinity, height: 100},
    ];
    const results = [];
    try {
      for (const rect of invalid) {
        Object.defineProperty(node, 'getBoundingClientRect', {configurable: true, value: nativeRect});
        const valid = nativeRect();
        node.dispatchEvent(new PointerEvent('pointermove', {
          clientX: valid.left + valid.width * 0.25,
          clientY: valid.top + valid.height * 0.25,
        }));
        const wasActive = node.dataset.tiltActive;
        Object.defineProperty(node, 'getBoundingClientRect', {configurable: true, value: () => rect});
        node.dispatchEvent(new PointerEvent('pointermove', {clientX: 10, clientY: 10}));
        const style = getComputedStyle(node);
        results.push({
          wasActive,
          active: node.dataset.tiltActive,
          values: ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y']
            .map(name => Number.parseFloat(style.getPropertyValue(name))),
        });
      }
    } finally {
      if (original) Object.defineProperty(node, 'getBoundingClientRect', original);
      else delete node.getBoundingClientRect;
    }
    return results;
  });
  expect(samples).toHaveLength(6);
  for (const sample of samples) {
    expect(sample.wasActive).toBe('true');
    expect(sample.active).toBe('false');
    expect(sample.values).toEqual([0, 0, 50, 50]);
  }
});

test('fine-pointer card tilt responds to a real browser pointer', async ({page}) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const card = page.locator('.project').first();
  await card.hover({position: {x: 20, y: 20}});
  await expect(card).toHaveAttribute('data-tilt-active', 'true');
  const sample = await card.evaluate(node => {
    const style = getComputedStyle(node);
    return {
      x: Number.parseFloat(style.getPropertyValue('--tilt-x')),
      y: Number.parseFloat(style.getPropertyValue('--tilt-y')),
      spotX: Number.parseFloat(style.getPropertyValue('--spot-x')),
      spotY: Number.parseFloat(style.getPropertyValue('--spot-y')),
    };
  });
  expectFiniteBounds(sample);
  expect(Math.abs(sample.x) + Math.abs(sample.y)).toBeGreaterThan(0);
  await page.mouse.move(0, 0);
  await expect(card).toHaveAttribute('data-tilt-active', 'false');
  const reset = await card.evaluate(node => ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y']
    .map(name => Number.parseFloat(getComputedStyle(node).getPropertyValue(name))));
  expect(reset).toEqual([0, 0, 50, 50]);
  expect(errors).toEqual([]);
});

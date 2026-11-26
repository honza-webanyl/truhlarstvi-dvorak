async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await page.locator('#konfigurator').scrollIntoViewIfNeeded()
  const before = await page.getByTestId('price-estimate').textContent()
  await page.locator('#length').evaluate((el, v) => {
    const input = el
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    setter?.call(input, String(v))
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }, 5.5)
  await page.waitForTimeout(150)
  const after = await page.getByTestId('price-estimate').textContent()

  // toggle wardrobe type
  await page.locator('input[name="type"][value="wardrobe"]').check()
  await page.waitForTimeout(100)
  const afterType = await page.getByTestId('price-estimate').textContent()

  return { before, after, afterType, changedByLength: before !== after, changedByType: after !== afterType }
}

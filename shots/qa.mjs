async (page) => {
  const loadAndCheck = async (w, h) => {
    await page.setViewportSize({ width: w, height: h })
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = 'eager'
        if (!img.complete) {
          await new Promise((r) => {
            img.onload = img.onerror = r
          })
        }
      }
      let y = 0
      while (y < document.body.scrollHeight) {
        window.scrollBy(0, 700)
        y += 700
        await new Promise((r) => setTimeout(r, 30))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 200))
    })

    return page.evaluate(() => {
      const imgs = [...document.images]
      const broken = imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.src)
      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        broken,
        ok: imgs.length - broken.length,
        total: imgs.length,
        showroom: !!document.querySelector('#showroom'),
        config: !!document.querySelector('#konfigurator'),
        materials: !!document.querySelector('#materialy'),
      }
    })
  }

  const desktop = await loadAndCheck(1440, 900)
  await page.screenshot({ path: 'shots/desktop-1440.png' })

  // Showroom open
  await page.locator('#showroom button').first().click()
  await page.waitForTimeout(300)
  const modalOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"]'))
  await page.getByRole('button', { name: 'Zavřít' }).click()
  await page.waitForTimeout(200)

  // Configurator — change length and read price
  await page.locator('#konfigurator').scrollIntoViewIfNeeded()
  const priceBefore = await page.locator('#konfigurator').locator('.tabular-nums').filter({ hasText: 'Kč' }).first().textContent()
  await page.locator('#length').fill('5')
  await page.waitForTimeout(100)
  const priceAfter = await page.locator('#konfigurator').locator('.tabular-nums').filter({ hasText: 'Kč' }).first().textContent()

  // Material swatch
  await page.locator('#materialy').scrollIntoViewIfNeeded()
  await page.locator('#materialy [role="tab"]').nth(1).click()
  const materialPanel = await page.locator('#materialy [role="tabpanel"]').textContent()

  const mobile = await loadAndCheck(375, 812)
  await page.screenshot({ path: 'shots/mobile-375.png' })

  return {
    desktop,
    mobile,
    modalOpen,
    priceBefore,
    priceAfter,
    priceChanged: priceBefore !== priceAfter,
    materialPanel: materialPanel?.slice(0, 80),
  }
}

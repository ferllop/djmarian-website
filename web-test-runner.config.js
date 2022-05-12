function myPlugin() {
    return {
        name: 'disable-javascript',
        async executeCommand({command, payload}) {
            if (command !== 'disable-javascript') {
                return undefined
            }
            if (session.browser.type === 'puppeteer') {
                const page = session.browser.getPage(session.id)
                if (page.isJavaScriptEnabled()) {
                    await page.setJavaScriptEnabled(false)
                }
                await page.reload()
                return true
            }

            if (session.browser.type === 'playwright') {
                const context = await session.browser.newContext({
                    javaScriptEnabled: false,
                })
                const page = session.browser.getPage(session.id)
                await page.reload()
                return true
            }

            throw new Error(
                `Disabling javascript is not supported for browser type ${session.browser.type}.`,
            )
        },
    }
}

export default {
    plugins: [myPlugin()],
}

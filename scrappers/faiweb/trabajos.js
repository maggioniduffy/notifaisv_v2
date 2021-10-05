import puppeteer from 'puppeteer'
const URL = 'https://faiweb.uncoma.edu.ar/index.php/bolsa-de-trabajo'

async function fetchTrabajos() {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto(URL)

    let trabajos;
    try {
        trabajos = await page.evaluate(() => {
            const trabajos = []
            const elements = document.querySelectorAll('[class=page-header] h2 a ')
            for (let job of elements) {
                let ref = job.href;
                let titulo = job.innerHTML;
                let obj = {
                    title: titulo.trim(),
                    link: ref,
                }
                trabajos.push(obj)
            }
            return trabajos
        })
    } catch (e) {
        console.log(e)
    }
    await browser.close()
    console.log(trabajos)
    return trabajos
}

export default fetchTrabajos
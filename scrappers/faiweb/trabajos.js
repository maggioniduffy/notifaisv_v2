import puppeteer from 'puppeteer';
import { uid } from 'uid';

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
        throw new Error("error en trabajos")
    }

    await browser.close();

    trabajos = trabajos.map((t) => (
        {...t, id: uid(100)}
    ))

    return trabajos
}

export default fetchTrabajos
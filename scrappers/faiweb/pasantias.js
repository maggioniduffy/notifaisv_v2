import puppeteer from 'puppeteer'
import { uid } from 'uid';

const URL = 'https://faiweb.uncoma.edu.ar/index.php/70-extension/pasantias'
console.log(uid());

async function fetchPasantias() {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto(URL)

    let pasantias
    try {
        pasantias = await page.evaluate(() => {
            const pasantias = []
            const elements = document.querySelectorAll('[class=page-header] h2 a ')
            for (let pas of elements) {
                let ref = pas.href;
                let titulo = pas.innerHTML;
                let obj = {
                    title: titulo.trim(),
                    link: ref,
                }
                pasantias.push(obj)
            }
            return pasantias
        })
    } catch (error) {
        throw new Error("error en pasantias")
    }
    await browser.close()
    
    const pasantias_id = pasantias.map((p) => (
        {...p, id: uid(100)}
    ))
    
    return pasantias_id;
}

export default fetchPasantias;
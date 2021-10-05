import puppeteer from 'puppeteer'
const URL = 'https://faiweb.uncoma.edu.ar/index.php/70-extension/pasantias'

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
        console.log(error)
    }
    await browser.close()
    
    console.log(pasantias);
    return pasantias;
}

export default fetchPasantias;
import puppeteer from 'puppeteer';
import { uid } from 'uid';

const URL = 'https://faiweb.uncoma.edu.ar';

async function fetchNoticias() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    await page.goto(URL)
    let noticias;
    try {
        noticias = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class=page-header] h2 a ')
            const noticias = [];
            for (let noticia of elements) {
                let ref = noticia.href;
                let titulo = noticia.innerHTML;
                let obj = {
                    title: titulo.trim(),
                    link: ref,
                }
                noticias.push(obj)
            }
            return noticias
        })
    } catch (error) {
        throw new Error(error + "error en principal")
    }
    
    await browser.close()

    noticias = noticias.map((n) => (
        {... n, id: uid(100)}
    ))

    console.log(noticias)

    return noticias
}

export default fetchNoticias
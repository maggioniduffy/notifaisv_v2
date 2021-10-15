import puppeteer from 'puppeteer';
import { uid } from 'uid';

const browser = await puppeteer.launch({
    headless: true
})

export async function fetch(URL){
    let data;
    try {
        const page = await browser.newPage();
        await page.goto(URL)
        data = await page.evaluate(() => {
            const data = []
            const elements = document.querySelectorAll('[class=page-header] h2 a ')
            for (let item of elements) {
                let ref = item.href;
                let titulo = item.innerHTML;
                let obj = {
                    title: titulo.trim(),
                    link: ref,
                }
                data.push(obj)
            }
            return data
        })
    } catch (e) {
        console.log(e);
        throw new Error("error fetching", e)
    }

    const data_con_id = data.map((item) => (
        {...item, id: uid(100)}
    ))

    return data_con_id;
}


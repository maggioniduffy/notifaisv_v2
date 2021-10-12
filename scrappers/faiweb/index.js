import puppeteer from 'puppeteer';
import { uid } from 'uid';

export async function fetch(URL){
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto(URL)

    let data;
    try {
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
        throw new Error("error fetching", e)
    }

    await browser.close();

    const data_con_id = data.map((item) => (
        {...item, id: uid(100)}
    ))

    return data_con_id;
}
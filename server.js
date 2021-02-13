const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs')
const randomUseragent = require('random-useragent');

let paginates = []

let count = 0;

let browser;

let page;

let data = []

const saveExcel = (data) => {

    const workbook = new ExcelJS.Workbook()

    const fileName = `lista-de-iphones.xlsx`

    const sheet = workbook.addWorksheet(`Resultados`)

    const reColumns = [
        { header: 'Nombre', key: 'name' },
        { header: 'Precio', key: 'price' },
        { header: 'Image', key: 'image' }
    ]

    sheet.columns = reColumns

    sheet.addRows(data)

    workbook.xlsx.writeFile(fileName).then((e) => {
        console.log('Creado exitosamente');
    })
        .catch(() => {
            console.log('Algo sucedio guardando el archivo EXCEL');
        })
}

const initialization = async (url = false) => {

    const proxyUrlSingle = 'http://api.scraperapi.com?api_key=a1c6525d3461349be9aeb52c85acfabd&url='

    const urlMain = `${proxyUrlSingle}https://listado.mercadolibre.com.mx/iphone#D[A:iphone]`

    const header = randomUseragent.getRandom((ua) => {
        return ua.browserName === 'Firefox';
    });

    const proxyUrl = 'proxy-server.scraperapi.com:8001'

    const userProxy = 'scraperapi'

    const passwordProxy = 'a1c6525d3461349be9aeb52c85acfabd'

    console.log('Vuelta numero ==>', count);

    console.log('Visitando pagina ==>', url);

    if (url === false) {
        browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            // args: [`--proxy-server=${proxyUrl}`]
        });

        page = await browser.newPage();

        await page.authenticate({ userProxy, passwordProxy });

        await page.setUserAgent(header)


        await page.setViewport({ width: 1920, height: 1080 });
    }

    if (count > 5) {
        console.log('Chao!! 5 Vueltas realizadas');
        await browser.close()

    } else {

        // await page.setDefaultNavigationTimeout(60000);

        await page.goto((url) ? `${proxyUrlSingle}${url}` : urlMain);

        await page.screenshot({ path: 'example.png' });

        await page.waitForSelector('.ui-search-results')

        const objectNextButton = await page.$('.andes-pagination__button--next a')

        const getUrl = await page.evaluate(objectNextButton => objectNextButton.getAttribute('href'),
            objectNextButton);

        const listaDeItems = await page.$$('.ui-search-layout__item')

        for (const item of listaDeItems) {

            const objectoPrecio = await item.$('.price-tag-fraction')
            const image = await item.$(".ui-search-result-image__element");
            const name = await item.$(".ui-search-item__title");

            const getPrice = await page.evaluate(objectoPrecio => objectoPrecio.innerText, objectoPrecio);

            const getName = await page.evaluate(name => name.innerText, name);

            const getImage = await page.evaluate(image => image.getAttribute('src'), image);

            data.push(
                {
                    name: getName,
                    price: getPrice,
                    image: getImage
                }
            )
        }

        count++;


        saveExcel(data)

        initialization(getUrl)

        // await browser.close();


    }


}




initialization();

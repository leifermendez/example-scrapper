const puppeteer = require('puppeteer')
const ExcelJS = require('exceljs')
const randomUseragent = require('random-useragent');
const fs = require('fs')

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



saveCookies = (data) => {
    let cookies = []
    data.map(value => {
        cookies.push(value)
    })

    fs.writeFile('cookies.txt', JSON.stringify(cookies), (err) => {
        if (err) return console.error(err);
    });

}

/**
 * Simular LOGIN 
 */

const simularLogin = async () => {

    const header = randomUseragent.getRandom((ua) => {
        return ua.browserName === 'Firefox';
    });

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        // args: [`--proxy-server=${proxyUrl}`]
    });

    const page = await browser.newPage();

    await page.setUserAgent(header)

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(`https://secure.alkosto.com/customer/account/login/`);

    const inputEmail = await page.waitForSelector('#login-username')

    const inputPassword = await page.waitForSelector('#login-password')

    await inputEmail.type("vehade2682@fironia.com");

    await inputPassword.type("12345678");

    await page.click('#send2')

    const cookies = await page.cookies()

    saveCookies(cookies)




    // const readCookie = fs.readFileSync('cookies.txt', 'utf8')

    // console.log(readCookie);

    // const parseCookie = JSON.parse(readCookie)

    // console.log(parseCookie);
    // console.log(JSON.parse(readCookie));

    // await page.setCookie(...parseCookie);

    // await page.goto(`https://secure.alkosto.com/customer/account/edit/`);



    // await page.screenshot({ path: 'example.png' });




    // await loginInput.type("vehade2682@fironia.com");

    // await loginPassword.type("12345678");

    // await page.click('#send2')

    // const cookies = await page.cookies()

    // console.log(cookies);

    // saveCookies(cookies)

    // await page.goto(`https://www.alkosto.com/salesperson/result/?q=iphone`)


    // const passInput = page.waitForSelector('.textBoxMedianoLogin[password]')

    // await page.type(loginInput, "841185308");
}

const loginConCookies = async () => {
    const header = randomUseragent.getRandom((ua) => {
        return ua.browserName === 'Firefox';
    });

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        // args: [`--proxy-server=${proxyUrl}`]
    });

    const page = await browser.newPage();

    await page.setUserAgent(header)

    await page.setViewport({ width: 1920, height: 1080 });

    const readCookie = fs.readFileSync('cookies.txt', 'utf8')

    const parseCookie = JSON.parse(readCookie)

    await page.setCookie(...parseCookie);

    await page.goto(`https://secure.alkosto.com/customer/account/edit/`);


}

const byCaptcha = async () => {
  

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'a2053610c42cf6944cd4f275bb9aaa4b', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
)

// puppeteer usage as normal
puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage()
  await page.goto('https://www.google.com/recaptcha/api2/demo')

  // That's it, a single line of code to solve reCAPTCHAs 🎉
  await page.solveRecaptchas()

  await Promise.all([
    page.waitForNavigation(),
    page.click(`#recaptcha-demo-submit`),
  ])
  await page.screenshot({ path: 'response.png', fullPage: true })
  await browser.close()
})
}

const conProxy = async () => {
    const header = randomUseragent.getRandom((ua) => {
        return ua.browserName === 'Firefox';
    });

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        // args: [`--proxy-server=${proxyUrl}`]
    });

    const page = await browser.newPage();

    await page.setUserAgent(header)

    await page.setViewport({ width: 1920, height: 1080 });

    const readCookie = fs.readFileSync('cookie-k.txt', 'utf8')

    const parseCookie = JSON.parse(readCookie)

    await page.setCookie(...parseCookie);

    await page.goto(`https://www.ktronix.com/my-account`);

    
}

// conProxy();
// byCaptcha();

// loginConCookies();
// simularLogin();
// initialization();

/**
 * ###########################################################################################
 * LIVE
 * ##########################################################################################
 * 
 */

const saveExcelIdealista = (data) => {

    const workbook = new ExcelJS.Workbook()

    const fileName = `lista-de-propiedades.xlsx`

    const sheet = workbook.addWorksheet(`Resultados`)

    const reColumns = [
        { header: 'Nombre del Piso', key: 'name' },
        { header: 'Precio', key: 'price' },
        { header: 'Link', key: 'link' }
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

 const visitarIdealista = async () => {

    let dataIdealista = []

    const userAgent = randomUseragent.getRandom((ua) => {
        return ua.browserName === 'Firefox';
    });

    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    
    console.log('Visitando sitio...')

    await page.setUserAgent(userAgent)

    await page.setViewport({ width: 1920, height: 1080 });

    await page.setDefaultNavigationTimeout(60000);

    const urlProxy = `http://api.scraperapi.com/?api_key=a1c6525d3461349be9aeb52c85acfabd&url=`

    await page.goto(`${urlProxy}https://www.idealista.com/alquiler-viviendas/madrid/chamberi/almagro/`);

    await page.waitForSelector('.items-container')

    const listObjectItems = await page.$$('article.item');

    for(const item of listObjectItems){

        const titleObject = await item.$('a.item-link')
        
        const pirceObject = await item.$('span.item-price')

        const getTitle = await page.evaluate(title => title.innerText, titleObject)

        const getLink = await page.evaluate(title => title.getAttribute('href'), titleObject)

        const getPrice = await page.evaluate(price => price.innerText, pirceObject)

        dataIdealista.push(
            {
                name:getTitle,
                price:getPrice,
                link:`https://www.idealista.com${getLink}`
            }
        )

    }

    await browser.close();

    saveExcelIdealista(dataIdealista)


 }


 visitarIdealista();
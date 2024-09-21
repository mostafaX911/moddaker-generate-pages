var http = require("http");
var fs = require("fs");
const reader = require("xlsx");
const file = reader.readFile("./test.xlsx");

let data = [];

const sheets = file.SheetNames;
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}
for (let i = 1; i <= 604; i++) {
  const pageArr = data.filter((res) => res.page === i);

  const page_number = pageArr[0].page;

  const sura_name = pageArr.filter((res) => {
    if (res.type === "meta" && res.meta_type === "sura_name") {
      return true;
    } else {
      return false;
    }
  })[0]?.nass_7;

  const sura_type = pageArr.filter((res) => {
    if (res.type === "meta" && res.meta_type === "sura_type") {
      return true;
    }
    return false;
  })[0]?.nass_7;

  const word_maqased = pageArr.filter((res) => {
    if (res.type === "meta" && res.meta_type === "word_maqased") {
      return true;
    }
    return false;
  })[0]?.nass_7;

  const maqased = pageArr.filter((res) => {
    if (res.type === "maqased") {
      return true;
    }
    return false;
  })[0]?.nass_7;

  const word_tafsir = pageArr.filter((res) => {
    if (res.type === "meta" && res.meta_type === "word_tafsir") {
      return true;
    }
    return false;
  })[0]?.nass_7;

  const intro = pageArr.filter((res) => {
    if (res.type === "intro") {
      return true;
    }
    return false;
  })[0]?.nass_7;

  const word_fawaed = pageArr.filter((res) => {
    if (res.type === "meta" && res.meta_type === "word_fawaed") {
      return true;
    }
    return false;
  })[0]?.nass_7;

  const tafsir = pageArr.filter((res) => {
    if (res.type === "tafsir") {
      return true;
    }
    return false;
  });

  const fawaed = pageArr.filter((res) => {
    if (res.type === "fawaed") {
      return true;
    }
    return false;
  });

  var fileName = `./pages/${i}/index.html`;

  // http
  //   .createServer(function (req, res) {
  //     var html = buildHtml(req);

  //     res.writeHead(200, {
  //       "Content-Type": "text/html",
  //       "Content-Length": html.length,
  //       Expires: new Date().toUTCString(),
  //     });
  //     res.end(html);
  //   })
  //   .listen(8080);

  function buildHtml() {
    var header = `<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="X-UA-Compatible" content="ie=edge"/><title>الصفحة ١ - المختصر في تفسير القرآن الكريم</title><style>html {
   font-size: 17px;
}

@supports (font: -apple-system-body) {
   html {
      font: -apple-system-body;
   }
}

@media only screen and (min-width: 600px) {
   html {
     font-size: 19px;
   }
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #FCF4E6;
    margin: 0;
 }
 
 .rtl {
   direction: rtl;
 }

 .wrapper {
    max-width: 600px;
    margin: 0 auto;
 }

 .body--wrapper {
   padding: 12px;
 }

 .site-header {
   background: #F5ECDC;
   border-bottom: 1px solid #DED2BF;
   position: -webkit-sticky;
   position: sticky;
   top: 0;
}

.site-header--wrapper {
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 100%;
   padding: 0 12px;
}

.site-header--wrapper a {
   font-weight: bold;
   font-size: 1rem;
   text-decoration: none;
   color: #036901;
   padding: 0.5rem;
}

.site-header--wrapper a:hover {
   color: #139110;
}

 h1 {
    text-align: center;
    font-size: 1rem;
    color: rgb(80, 72, 64);
 }
 
 h2 {
    font-size: 1.2rem;
    margin: 30px 0 0 0;
    color: rgb(80, 72, 64);
    padding-right: 12px;
 }
 
 h3 {
    font-size: 1.1rem;
    color: #9C856E;
    margin-top: 24px;
    margin-bottom: 12px;
    padding-right: 12px;
 }

 p, li {
   line-height: 1.75rem;
   padding: 12px;
   margin: 0;
   color: rgb(80, 72, 64);
 }

 .highlighted p {
    background-color: #F5ECDC;
    border-radius: 0.5rem;
 }
 
 ul {
   margin: 0;
   padding: 16px 0;
   list-style-position: inside;
}

li {
   padding-top: 0;
   padding-bottom: 8px;
}

 em {
    color: #9B2725;
    font-style: normal;
 }
 
 .verse {
    color: #036901;
    font-weight: 500;
    padding: 20px 12px;
    direction: rtl;
 }
 </style>`;
    var body = `<header class="site-header">
      <div class="wrapper site-header--wrapper">
        <div class="site-header--item">
        ${
          page_number === 1
            ? ""
            : `<a href="../${page_number - 1}"><span>→</span></a>`
        }
          
        </div>
        <div class="site-header--item"><h1>الصفحة ${page_number}</h1></div>
        <div class="site-header--item">
          ${
            page_number === 604
              ? ""
              : `<a href="../${page_number + 1}"><span>←</span></a>`
          }
        </div>
      </div>
    </header>
    <div class="wrapper body--wrapper">
      ${
        sura_name
          ? `<h2>${sura_name} ${sura_type ? `(${sura_type})` : ""}</h2>`
          : ""
      }
      ${word_maqased ? `<h3>${word_maqased}</h3>` : ""}
      ${maqased ? `<div class="highlighted"><p>${maqased}</p></div>` : ""}
      ${word_tafsir ? `<h3>${word_tafsir}</h3>` : ""}
      ${
        intro
          ? `<div class="highlighted">
        <p>${intro}
        </p>
      </div>`
          : ""
      }
        ${tafsir
          .map((tafsirAya) => {
            return `<p class="verse">(${tafsirAya.aya}) ${tafsirAya.uthmani}</p>
                <div class="highlighted">
                  <p>
                    ${tafsirAya.nass_7}
                  </p>
                </div>`;
          })
          .join("")}
      <h3 class="rtl">${word_fawaed}</h3>
      <div class="highlighted rtl">
        <p>
          ${fawaed
            .map((fawaed1) => {
              return `${fawaed1.nass_7}<br>`;
            })
            .join("")}
        </p>
      </div>
    </div>`;

    // concatenate header string
    // concatenate body string

    return (
      "<!DOCTYPE html>" +
      "<html><head>" +
      header +
      `</head><body class="rtl">` +
      body +
      "</body></html>"
    );
  }

  var html = buildHtml();
  fs.writeFile(fileName, html, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

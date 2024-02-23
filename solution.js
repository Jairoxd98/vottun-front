import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://api.vottun.tech/erc/v1/erc721/tokenUri";

//Add your own bearer token from the previous lesson.
//const yourBearerToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyY1NYUzNSNGpLRkV3R1NJOWF1MkxKaXNUeWMiLCJ0eXBlIjoiZXJwIiwiaWQiOiIiLCJ1c2VybmFtZSI6ImphaXJvY3I5OEBob3RtYWlsLmNvbSIsImNpZCI6ImViMzM5YThhLTYyNWItNDM1Yi04NDRhLWQyYzRkOTBkMGIyYyIsInNrdSI6W3siciI6MTEsInMiOjMsImUiOjB9LHsiciI6MTEsInMiOjgwMDMsImUiOjB9LHsiciI6MTEsInMiOjgsImUiOjB9LHsiciI6MTEsInMiOjgwMDEsImUiOjB9LHsiciI6MTEsInMiOjgwMDUsImUiOjB9LHsiciI6MTEsInMiOjgwMTAsImUiOjB9LHsiciI6MTEsInMiOjgwMDIsImUiOjB9XSwicHVjIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIn0.bgLYR_jLFKch_FURFua_d8tEx6aWwkTE2Hi0mQwg2ehLZgOW9TwWQzPbzZJuU4WT6F8t5jNj395AKwj0YQac4lkkn6ANzd3ZbewHnQdtuwiq_DQ-rz0AjX7Ne3asjk3hcYBwFmJUf4m-GKjJN0wOsc5jGEYz2x0r9qOMaTve0WnjflgcB86yat-rHSif5AQPeQbJh6Rs9U82wmQyFhqjqxRYNRzLA0QwX3kufwGAW5cl8_6ngBlZ32wFUGbfWOW64yyDUDpo4lA1HOrm3vnjUXw51xPfFp5FqlBbUQbeuJDPBRo_Y-r1bMi75LwFYbnfYEWQ5-NX8G1uQYTaMtenaE1xAtWeJH02ElZSeJYxTVfCdaZAsIGehn2e4jdc0Muwe7x4XJmW6BwONBzn29lXugGYuwALk8r_pGA_NUZR9a9QkWXmSJ-BhOyEO2sREqcu6Nq0naadu_I3NoaGh_eHqKMti9VVVh6IpuTaC0AyIOk8AlvBb2jHi_NhJCpeZtyi_guPOmPoW-vrgmvzbx4VkViwvy7xlF5vHGLuWX1xpill0bR4rsIlYxjWz_GWwhv_CpXMK1jRYT3XdHisW5NF9GfNqFqEL67R2vhFAq_QJkgPPSdRyu6ctVD2vvimWl08Fds9i8Ctm8aXXfJuYMxn1zwLlvj7dzj6VvaxEVS6Vlk";
//const appId = "TC4JfUT8nRd7dYXuo8Nl7jTZ-t0T-UDfvScXOgSNkfJEcJs6XrVXV3qD8I2UfXGB";

const config = {
  headers: { 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
              'x-application-vkn': process.env.APP_ID,
             'Content-Type': 'application/json' },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data...", img:'https://media.tenor.com/dg5OPa0jmCkAAAAe/hang-on.png'});
});

app.post("/post", async (req, res) => {
  try {
    const dataToSend = {
      contractAddress: req.body.contractAddress,
      network: parseInt(req.body.network, 10),
      id: parseInt(req.body.id, 10)
    };
    
    const result = await axios.post(API_URL, dataToSend, config);
    
    res.render("index.ejs", { content: "Metadatos: "+JSON.stringify(result.data) , img: result.data.uri});

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const PDFDocument = require('pdfkit');
const fs = require("fs");
const cors = require("cors");




const app = express();
const port = 5000

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("PDF Generator server is running")
})


app.post("/create-pdf", async (req, res) => {
    try {
        const {fileName, name, position, address, phone, email, portfolio, github, linkedIn} = req.body;

        const doc = await new PDFDocument();
        doc.pipe(fs.createWriteStream(`./resumes/${fileName}.pdf`));

        doc
            .fontSize(25)
            .font("Helvetica")
            .text(`${name}`, 50, 50)

            doc
            .fontSize(20)
            .text(`${position}`, 50, 75)

            doc
            .fontSize(14)
            .text(`Address: ${address}`, 50, 120)
            .text(`Phone: ${phone}`, 50, 140)

            doc
            .fontSize(14)
            .text('My Email Address', 50, 160, {
                link: `${email}`,
                underline: true
            }
            )

            doc
            .fontSize(14)
            .text('My Portfolio', 50, 180, {
                link: `${portfolio}`,
                underline: true
            }
            )

            doc
            .fontSize(14)
            .text('GitHub Profile', 50, 200, {
                link: `${github}`,
                underline: true
            }
            )

            doc
            .fontSize(14)
            .text('LinkedIn Profile', 50, 220, {
                link: `${linkedIn}`,
                underline: true,

            }
            )

            doc
            .fontSize(20)
            .text('CAREER OBJECTIVE', 50, 260)

            doc
            .fontSize(14)
            .text("Hi, I am a Web Developer. I always try to do something to my best. As a web developer I always try to satisfy my client or company owner with my work. ", 50, 280)

            // skills
            doc
            .fontSize(20)
            .text('SKILLS', 50, 320);

            doc
            .fontSize(14)
            .text("Expert:  HTML, CSS, TailwindCss, Bootstrap, JavaScript, TypeScript, Reactjs, Redux, Mongoose, Expressjs, MongoDB, MVC Architecture", 50, 340)
            .text('Comfortable: Nodejs, , Axios, React Query, Firebase, JSON WEB TOKEN', 50, 375)
            .text('Familiar: Nextjs, Socket.io, and NPM packages.', 50, 395)


            // projects
            doc
            .fontSize(20)
            .text(`Best Project: Octal Phone Store`, 50, 435);

            doc
            .fontSize(16)
            .text('Live Website', 50, 460, {
            link: `${linkedIn}`,
            underline: true
            }
            )
            doc
            .fontSize(16)
            .text('Client Side Code', 50, 480, {
            link: `${linkedIn}`,
            underline: true
            }
            )
            doc
            .fontSize(16)
            .text('Live Website', 50, 500, {
                link: `${linkedIn}`,
                underline: true
            }
            )

            // projects
            doc
            .fontSize(16)
            .text(`Description:`, 50, 530)

            doc
            .fontSize(14)
            .list(["This is like a social website where a user can review for any product", "User can add, edit or delete his/her review", "User information highly protected"], 50, 550)


            // education
            doc
            .fontSize(20)
            .text(`Education`, 50, 620)

            doc
            .fontSize(14)
            .text(`Biswanath Darul Ulum Islamia Kamil (M.A) Madrasha`, 50, 640);

            // languages
            doc
            .fontSize(14)
            .text(`Languages`, 50, 670)
            .list(["Bangla, English, Hindi"], 50, 690)

            

        // Finalize PDF file
        doc.end();

        // return something
        res.send({ message: "PDF created successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


app.listen(port, () => {
    console.log(`PDF Generator server is running on port ${port}`);
})

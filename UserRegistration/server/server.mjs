import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import User from "./models/user.mjs";

//details to excel file
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import ExcelJS from 'exceljs';

//to secure the unexposed details
dotenv.config();

//db connect
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection err", err));

//middleware
const app = express();
app.use(morgan("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:(process.env.URL), //http://localhost:3000
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());


app.post("/api/register", async (req, res) => {
  //console.log("your end-point is here", req.body);
  const { name, phone, address } = req.body;
  console.log("user details are", name,phone,address);

  if (!name) return res.status(400).send("Name is required");
  if (!phone) return res.status(400).send("phone number is required");
  // Check if phone number contains only digits
  if (!/^\d+$/.test(phone)) {
    return res.status(400).send("Phone number must contain only digits (0-9)");
  }
  // Check if phone number length is exactly 10 digits
  if (phone.length !== 10) {
    return res.status(400).send("Phone number must be exactly 10 digits long");
  }
  if (!address) return res.status(400).send("address is required");

  //to check phone number is already existed or not
  const exist = await User.findOne({ phone });
  if (exist) return res.status(400).send("Phone number already existed" );

  const user = new User({ name, phone, address });
  try {
    await user.save();
    console.log("Registere User =>", user);

    /*here we are calling function to save in excel */
    await saveToExcel(name, phone, address );
    console.log('details exported to excel');
    
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("Registration failed =>", err);
    return res.status(400).send("Error please try again");
  }

});

/* here we are saving in excel sheet */
async function saveToExcel(name, phone, address) {
  const filePath = process.env.EXCEL_FILE_NAME;

  try {
    let workbook = new ExcelJS.Workbook();

    // Check if file exists
    try {
      await fs.access(filePath); // Check if file exists
      // File exists, load existing workbook
      workbook = await workbook.xlsx.readFile(filePath);
    } catch (error) {
      // File doesn't exist, create a new workbook
      workbook = new ExcelJS.Workbook();
    }

    let worksheet = workbook.getWorksheet('Users');
    if (!worksheet) {
      // Add new worksheet if 'Users' worksheet doesn't exist
      worksheet = workbook.addWorksheet('Users');
      // Add headers to the new worksheet
      worksheet.addRow(['name', 'phone', 'address']);
    }

    // Add data row
    worksheet.addRow([name, phone, address]);

    // Save workbook to a file
    await workbook.xlsx.writeFile(filePath);

    console.log('Excel file updated successfully');
  } catch (error) {
    console.error('Error saving to Excel:', error);
    throw error;
  }
}

// Set port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

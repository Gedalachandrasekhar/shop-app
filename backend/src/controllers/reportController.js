const pool = require("../config/db");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// ---------- COMPLAINTS CSV ----------
exports.complaintsCSV = async (req, res) => {
  const { from, to } = req.query;

  const result = await pool.query(
    `SELECT complaint_id, complaint_type, status, created_at
     FROM complaints
     WHERE created_at BETWEEN $1 AND $2
     ORDER BY created_at DESC`,
    [from, to]
  );

  const parser = new Parser();
  const csv = parser.parse(result.rows);

  res.header("Content-Type", "text/csv");
  res.attachment("complaints_report.csv");
  res.send(csv);
};

// ---------- INVENTORY CSV ----------
exports.inventoryCSV = async (req, res) => {
  const result = await pool.query(
    `SELECT part_name, category, quantity, unit_price FROM inventory`
  );

  const parser = new Parser();
  const csv = parser.parse(result.rows);

  res.header("Content-Type", "text/csv");
  res.attachment("inventory_report.csv");
  res.send(csv);
};

// ---------- COMPLAINT PDF ----------
exports.complaintsPDF = async (req, res) => {
  const result = await pool.query(
    `SELECT complaint_id, complaint_type, status FROM complaints`
  );

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=complaints.pdf");

  doc.pipe(res);
  doc.fontSize(16).text("Complaints Report\n\n");

  result.rows.forEach((c) => {
    doc
      .fontSize(10)
      .text(`${c.complaint_id} | ${c.complaint_type} | ${c.status}`);
  });

  doc.end();
};

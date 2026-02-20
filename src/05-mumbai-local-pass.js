/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Your code here

  if( passenger === null || typeof passenger != "object" ) return "INVALID PASS"; 
  
  const name = passenger.name;
  const frm = passenger.from ;
  const to = passenger.to ;
  const ct = passenger.classType;

  if( typeof name != "string" || name.trim() === ""  ||
  typeof frm != "string" || frm.trim() === ""  ||
  typeof to != "string" || to.trim() === ""  ||
  typeof ct != "string" || ct.trim() === ""  
    ) return "INVALID PASS"; 

  const ctyp = ct.trim().toLowerCase();
  if( ctyp !== "first" && ctyp !== "second" ) return "INVALID PASS";
 

const passID = (ctyp.charAt(0)  + frm.slice(0,3)  + to.slice(0,3)).toUpperCase();
const Line1 = "MUMBAI LOCAL PASS";
const Line2 = "---";
const Line3 = "Name: " + name.toUpperCase();
const Line4 = "From: " + frm.charAt(0).toUpperCase()  + frm.slice(1).toLowerCase() ;
const Line5 = "To: " + to.charAt(0).toUpperCase()  + to.slice(1).toLowerCase() ;
const Line6 = "Class: " + ctyp.toUpperCase();
const Line7 = "Pass ID: " + passID;


return Line1+ "\n" + Line2+ "\n" + Line3+ "\n" + Line4+ "\n" + Line5+ "\n" + Line6+ "\n" + Line7;





}

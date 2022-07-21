// ATTENTION : Il y a des noms de fonctions / fichiers qui portent à confusion.
// inscrit / Preinscrit    2018 / 2019  sheet / spreadsheet ...
//========================
// tools for count and index.

// function getInscrits2018Count() {
//     return Number(getSheetInscrits2018().getRange("A1").getValue().split(" ")[0]);
// }

// function getPREInscrits2019Count() {
//     return Number(getSheetPREInscrit2019().getRange("A1").getValue().split(" ")[0]);
// }
// function getInscrits2019Count() {
//     return Number(getSheetInscrits2019().getRange("A1").getValue().split(" ")[0]);
// }
// function getPREInscrits2020Count() {
//     return Number(getSheetPREInscrit2020().getRange("A1").getValue().split(" ")[0]);
// }
// function getInscrits2020Count() {
//     return Number(getSheetInscrits2020().getRange("A1").getValue().split(" ")[0]);
// }
// function getInscrits2021Count() {
//     return Number(getSheetInscrits2021().getRange("A1").getValue().split(" ")[0]);
// }
// function getPREInscritsCurrentYearCount() {
//     return Number(getSheetPREInscritsCurrentYear().getRange("A1").getValue().split(" ")[0]);
// }
// function getInscritsCurrentYearCount() {
//     return Number(getSheetInscritsCurrentYear().getRange("A1").getValue().split(" ")[0]);
// }
// // ==============================
// // Todo rename this.

// function getNewId() {
//     // this cell D1 contains a string like : "1234 ID", where 1234 is the next available id for entry creation.
//     //return getSheetPREInscritsCurrentYear().getRange("D1").getValue().split(' ')[0];
//     return Utilities.getUuid();
// }

// function getNextIndex() {
//     // this cell A1 contains a string like : "123 Préinscrits", where 123 is number of pré-inscrits.
//     var result = parseInt(getSheetPREInscritsCurrentYear().getRange("A1").getValue().split(" ")[0], 10);
//     result = 2 + result;
//     result = result.toString();
//     return result;
// }

// function createMemberEntryTest() {
//     var array = [
//         1,
//         1,
//         1,
//         "b22ec414-052a-4a4c-a05b-8cf27fb6eb31",
//         "TAILLANDIER",
//         "Romain",
//         "06/12/1978",
//         "01/08/2018",
//         "04/09/2017",
//         "FRANCOIS BARTHELEMY",
//         "https://drive.google.com/file/d/0ByEybon0uTPmZVJoUXJIWXE3SVU/view",
//         "110",
//         "Paiement par virement",
//         "https://drive.google.com/file/d/123zMvstCN3obV5btz6DmQvB-HnX1JVOG/view",
//         "Mr",
//         "Masculin",
//         "2 bis Rue de Lorraine",
//         "77420",
//         "CHAMPS SUR MARNE",
//         "06 26 40 65 36",
//         1,
//         1,
//         "romaintaillandier@gmail.com",
//         1,
//         42,
//         "40-44",
//         "Initiateur",
//         "ADULTES/ADO",
//         "Normal",
//         "16/09/2012",
//         "Besoin FSGT",
//         "06/09/2018",
//         "518068",
//         "",
//         "",
//     ];

//     var member = new Member();
//     member.fromSheetArrayPreviousYear(array);
//     return createMemberEntry(member);
// }

// function createNewMemberTest() {
//     var array = [
//         1,
//         1,
//         1,
//         undefined,
//         "TAILLANDIER",
//         "Romain",
//         "06/12/1978",
//         "01/08/2018",
//         "04/09/2017",
//         "FRANCOIS BARTHELEMY",
//         "https://drive.google.com/file/d/0ByEybon0uTPmZVJoUXJIWXE3SVU/view",
//         "110",
//         "Paiement par virement",
//         "https://drive.google.com/file/d/123zMvstCN3obV5btz6DmQvB-HnX1JVOG/view",
//         "Mr",
//         "Masculin",
//         "2 bis Rue de Lorraine",
//         "77420",
//         "CHAMPS SUR MARNE",
//         "06 26 40 65 36",
//         1,
//         1,
//         "romaintaillandier@gmail.com",
//         1,
//         42,
//         "40-44",
//         "Initiateur",
//         "ADULTES/ADO",
//         "Normal",
//         "16/09/2012",
//         "Besoin FSGT",
//         "06/09/2018",
//         "518068",
//         "",
//         "",
//     ];

//     var member = new Member();
//     member.fromSheetArrayPreviousYear(array);
//     return createMemberEntry(member);
// }

// // TODO Rename this.
// // TODO For this method : add mutex over the whole sheet.
// function createMemberEntry(member) {
//     var inscrits = getSheetPREInscritsCurrentYear();
//     var index = getNextIndex();
//     if (member.id === null || member.id === undefined || member.id === "") member.id = getNewId();
//     var memberArray = member.toSheetArray(index);
//     inscrits.getRange("A" + index + ":AI" + index).setValues(memberArray);
//     inscrits.getRange("G" + index + ":I" + index).setNumberFormat("@"); // je ne veux aps que les dates soient formattée automatiqueemnt.
// }

// function getMemberEntryTest() {
//     Logger.log("getMemberEntryTest : ");
//     var memberArray = getMemberFullEntryFrom(getSheetInscrits2021(), "BRATHIER", "Noah", "31/12/2010");
//     //var memberArray = getMember2021FullEntry("BRATHIER","Noah","31/12/2010");
//     //getMember2019FullEntry("TAILLANDIER","Romain","06/12/1978");
//     //getPREInscrits2019FullEntry("TAILLANDIER","Romain","06/12/1978");
// }

// function getMemberFullEntryFrom(sheet, name, firstname, birthdate) {
//     var count = sheet.getRange("A1").getValue().split(" ")[0];
//     Logger.log("getMemberFullEntryFrom sheet = " + sheet.getName() + " (" + count + " lines)");

//     if (count == 0) return null;

//     var maxline = +count + 1;
//     // Here do not return getValue because it will be converted to null
//     // https://stackoverflow.com/questions/50457896/null-value-returned-to-apps-script-webapp-for-a-certain-spreadsheet-by-server-fu
//     var lines = sheet.getRange("A2:G" + maxline).getDisplayValues();
//     //var index = -1;
//     for (var i = 0; i < count; ++i) {
//         Logger.log("line " + i);
//         if (
//             name.toString().toUpperCase() === lines[i][4].toString().toUpperCase() &&
//             firstname.toString().toUpperCase() === lines[i][5].toString().toUpperCase() &&
//             birthdate == lines[i][6]
//         ) {
//             var index = i + 2;
//             var result = sheet.getRange("A" + index + ":AN" + index).getDisplayValues()[0];
//             Logger.log("getMemberFullEntryFrom Result = " + result);
//             return result;
//         }
//     }
//     return null;
// }

// function getMember2018FullEntry(name, firstname, birthdate) {
//     Logger.log("getMember2018FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetInscrits2018(), name, firstname, birthdate);
// }

// function getMember2019FullEntry(name, firstname, birthdate) {
//     Logger.log("getMember2019FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetInscrits2019(), name, firstname, birthdate);
// }

// function getPREInscrits2019FullEntry(name, firstname, birthdate) {
//     Logger.log("getPREInscrits2019FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetPREInscrit2019(), name, firstname, birthdate);
// }

// function getMember2020FullEntry(name, firstname, birthdate) {
//     Logger.log("getMember2020FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetInscrits2020(), name, firstname, birthdate);
// }

// function getPREInscrits2020FullEntry(name, firstname, birthdate) {
//     Logger.log("getPREInscrits2020FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetPREInscrit2020(), name, firstname, birthdate);
// }

// function getMember2021FullEntry(name, firstname, birthdate) {
//     Logger.log("getMember2021FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetInscrits2021(), name, firstname, birthdate);
// }

// function getPREInscrits2021FullEntry(name, firstname, birthdate) {
//     Logger.log("getPREInscrits2021FullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetPREInscrit2021(), name, firstname, birthdate);
// }

// function getMemberPreviousYearFullEntry(name, firstname, birthdate) {
//     Logger.log("getMemberPreviousYearFullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetInscritsPreviousYear(), name, firstname, birthdate);
// }

// function getMemberCurrentYearFullEntry(name, firstname, birthdate) {
//     Logger.log("getMemberCurrentYearFullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetInscritsCurrentYear(), name, firstname, birthdate);
// }

// function getPREInscritsCurrentYearFullEntry(name, firstname, birthdate) {
//     Logger.log("getPREInscritsCurrentYearFullEntry " + name + " " + firstname + " " + birthdate);
//     return getMemberFullEntryFrom(getSheetPREInscritsCurrentYear(), name, firstname, birthdate);
// }

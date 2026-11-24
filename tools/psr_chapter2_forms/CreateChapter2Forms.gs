/**
 * PSR Chapter 2 Google Forms generator.
 *
 * How to use:
 * 1. Upload chapter2_question_bank.csv to Google Drive and open it as Google Sheets.
 * 2. Rename the sheet tab to "Question Bank" if needed.
 * 3. Open Extensions > Apps Script.
 * 4. Paste this script and run createNextChapter2Form().
 * 5. Authorize the script when Google asks.
 *
 * This batch-safe version creates or resumes one quiz Form per run, then writes
 * edit/respondent links to a "Generated Forms" sheet. Run createNextChapter2Form()
 * repeatedly until it reports that all forms are complete.
 */

const CONFIG = {
  questionSheetName: 'Question Bank',
  outputSheetName: 'Generated Forms',
  outputFolderName: 'PSR Chapter 2 Generated Forms',
  confirmationMessage: 'Thank you for completing this PSR Chapter 2 practice quiz.',
};

function createNextChapter2Form() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const questionSheet = spreadsheet.getSheetByName(CONFIG.questionSheetName) || spreadsheet.getSheets()[0];
  const rows = readObjects_(questionSheet);
  if (!rows.length) {
    throw new Error('No question rows found.');
  }

  const folder = getOrCreateFolder_(CONFIG.outputFolderName);
  const groups = groupBy_(rows, 'form_group_id');
  const outputSheet = setupOutputSheet_(spreadsheet);
  const completed = getCompletedGroups_(outputSheet);
  const groupIds = Object.keys(groups).sort();

  for (const groupId of groupIds) {
    if (completed[groupId]) continue;

    const groupRows = groups[groupId];
    const first = groupRows[0];
    const form = getOrCreateForm_(folder, first.form_title);

    configureForm_(form, first.description);

    const existingQuestionCount = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).length;
    const remainingRows = groupRows.slice(existingQuestionCount);

    remainingRows.forEach((row) => addMultipleChoiceQuizItem_(form, row));

    const finalQuestionCount = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).length;
    if (finalQuestionCount !== groupRows.length) {
      throw new Error(
        `Form ${first.form_title} has ${finalQuestionCount} questions, expected ${groupRows.length}. Run createNextChapter2Form() again.`
      );
    }

    outputSheet.appendRow([
      first.form_index,
      groupId,
      first.form_title,
      groupRows.length,
      form.getEditUrl(),
      form.getPublishedUrl(),
      'DONE',
      new Date(),
    ]);

    SpreadsheetApp.flush();
    Logger.log(`Completed ${first.form_title}. Run createNextChapter2Form() again for the next form.`);
    return;
  }

  Logger.log('All Chapter 2 forms are complete.');
}

function createChapter2Forms() {
  createNextChapter2Form();
}

function resetGeneratedFormsProgressOnly() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = setupOutputSheet_(spreadsheet);
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  Logger.log('Progress sheet cleared. Existing Google Forms were not deleted.');
}

function configureForm_(form, description) {
  form.setDescription(description);
  form.setIsQuiz(true);
  form.setConfirmationMessage(CONFIG.confirmationMessage);
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setPublishingSummary(false);
}

function addMultipleChoiceQuizItem_(form, row) {
  const item = form.addMultipleChoiceItem();
  item.setTitle(row.question);
  item.setRequired(true);
  item.setPoints(Number(row.points || 1));

  const correctOption = String(row.correct_option).trim().toUpperCase();
  const options = [
    ['A', row.option_a],
    ['B', row.option_b],
    ['C', row.option_c],
    ['D', row.option_d],
  ];

  const choices = options.map(([letter, text]) => {
    return item.createChoice(String(text), letter === correctOption);
  });
  item.setChoices(choices);

  if (row.feedback) {
    const feedback = FormApp.createFeedback().setText(String(row.feedback)).build();
    item.setFeedbackForCorrect(feedback);
    item.setFeedbackForIncorrect(feedback);
  }
}

function readObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map((header) => String(header).trim());
  return values.slice(1)
    .filter((row) => row.some((value) => value !== ''))
    .map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
}

function groupBy_(rows, field) {
  return rows.reduce((groups, row) => {
    const key = String(row[field]);
    if (!groups[key]) groups[key] = [];
    groups[key].push(row);
    return groups;
  }, {});
}

function getOrCreateFolder_(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function getOrCreateForm_(folder, title) {
  const existingFiles = folder.getFilesByName(title);
  while (existingFiles.hasNext()) {
    const file = existingFiles.next();
    if (file.getMimeType() === MimeType.GOOGLE_FORMS) {
      return FormApp.openById(file.getId());
    }
  }

  const form = FormApp.create(title);
  DriveApp.getFileById(form.getId()).moveTo(folder);
  return form;
}

function setupOutputSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.outputSheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.outputSheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Form Index',
      'Form Group ID',
      'Form Title',
      'Question Count',
      'Edit URL',
      'Respondent URL',
      'Status',
      'Created At',
    ]);
  } else {
    const expectedHeaders = [
      'Form Index',
      'Form Group ID',
      'Form Title',
      'Question Count',
      'Edit URL',
      'Respondent URL',
      'Status',
      'Created At',
    ];
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
  }
  sheet.autoResizeColumns(1, 8);
  return sheet;
}

function getCompletedGroups_(sheet) {
  const completed = {};
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return completed;
  const headers = values[0].map((header) => String(header).trim());
  const groupIndex = headers.indexOf('Form Group ID');
  const statusIndex = headers.indexOf('Status');
  values.slice(1).forEach((row) => {
    if (String(row[statusIndex]).trim() === 'DONE') {
      completed[String(row[groupIndex]).trim()] = true;
    }
  });
  return completed;
}

function rebuildGeneratedFormsIndexFromDrive() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const questionSheet = spreadsheet.getSheetByName(CONFIG.questionSheetName) || spreadsheet.getSheets()[0];
  const rows = readObjects_(questionSheet);
  const groups = groupBy_(rows, 'form_group_id');
  const folder = getOrCreateFolder_(CONFIG.outputFolderName);
  const outputSheet = setupOutputSheet_(spreadsheet);

  const lastRow = outputSheet.getLastRow();
  if (lastRow > 1) {
    outputSheet.deleteRows(2, lastRow - 1);
  }

  Object.keys(groups).sort().forEach((groupId) => {
    const groupRows = groups[groupId];
    const first = groupRows[0];
    const existingFiles = folder.getFilesByName(first.form_title);
    while (existingFiles.hasNext()) {
      const file = existingFiles.next();
      if (file.getMimeType() !== MimeType.GOOGLE_FORMS) continue;
      const form = FormApp.openById(file.getId());
      const questionCount = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).length;
      outputSheet.appendRow([
        first.form_index,
        groupId,
        first.form_title,
        questionCount,
        form.getEditUrl(),
        form.getPublishedUrl(),
        questionCount === groupRows.length ? 'DONE' : 'INCOMPLETE',
        new Date(),
      ]);
      break;
    }
  });
  outputSheet.autoResizeColumns(1, 8);
}

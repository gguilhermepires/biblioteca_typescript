import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';

import { IFile, IGradeReportResult } from '../interfaces/iReport';
import DataConverter from './dataConverter';
import FileManipulation from './fileManipulation';

export default class PdfManipulation {
  static async createPdfsFromList(
    templatePath: string,
    listaData: IGradeReportResult[],
  ): Promise<IFile[]> {
    const source = await FileManipulation.openFileSync(templatePath);
    if (source === undefined) throw new Error('Could not load template pdf');

    const template = Handlebars.compile(source.toString());

    const headerPartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/header.hbs',
    );

    if (headerPartial) {
      Handlebars.registerPartial('header', headerPartial.toString());
    }

    const tableHeaderPartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/table-header.hbs',
    );

    if (tableHeaderPartial) {
      Handlebars.registerPartial('tableHeader', tableHeaderPartial.toString());
    }

    const gradeReportCoursePartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/grade-report-course.hbs',
    );

    if (gradeReportCoursePartial) {
      Handlebars.registerPartial(
        'gradeReportCourse',
        gradeReportCoursePartial.toString(),
      );
    }

    const gradeReportProjectPartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/grade-report-project.hbs',
    );

    if (gradeReportProjectPartial) {
      Handlebars.registerPartial(
        'gradeReportProject',
        gradeReportProjectPartial.toString(),
      );
    }

    const officialTranscriptCoursePartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/official-transcript-course.hbs',
    );

    if (officialTranscriptCoursePartial) {
      Handlebars.registerPartial(
        'officialTranscriptCourse',
        officialTranscriptCoursePartial.toString(),
      );
    }
    const officialTranscriptProjectPartial =
      await FileManipulation.openFileSync(
        './src/infrastructure/reportsTemplates/views/partials/official-transcript-project.hbs',
      );

    if (officialTranscriptProjectPartial) {
      Handlebars.registerPartial(
        'officialTranscriptProject',
        officialTranscriptProjectPartial.toString(),
      );
    }
    Handlebars.registerHelper(
      'ifEquals',
      function ifEquals(this: any, arg1: string, arg2: string, options: any) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
      },
    );

    Handlebars.registerHelper(
      'ifEven',
      function ifEven(this: any, arg1: number, options: any) {
        return arg1 % 2 === 0 ? options.fn(this) : options.inverse(this);
      },
    );

    Handlebars.registerHelper(
      'toFixed',
      function toFixed(this: any, arg1: number, arg2: number | string) {
        if (arg2 === null) return null;
        if (arg2 === undefined) return null;
        if (typeof arg2 === 'string') return parseInt(arg2, 10).toFixed(arg1);
        return arg2.toFixed(arg1);
      },
    );
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROMIUM_PATH,
      args: ['--no-sandbox'],
    });

    let listFile: any[] = [];
    const promises = [];

    for (const pdfData of listaData) {
      const pdfName = `grade_report_${pdfData.firstName}_${
        pdfData.name
      }_${DataConverter.getDataNow().getTime()}.pdf`;
      promises.push(this.createPdf(browser, template, pdfName, pdfData));
    }

    listFile = await Promise.all(promises);

    await browser.close();
    return listFile;
  }

  static async createPdf(
    browser: any,
    template: any,
    pdfName: string,
    pdfData: IGradeReportResult,
  ): Promise<IFile> {
    const page = await browser.newPage();
    const result = template(pdfData);
    await page.setContent(result, { waitUntil: 'load' });
    await page.emulateMediaType('screen');
    await page.pdf({
      path: `tmp/${pdfName}`,
      margin: { top: '50px', right: '50px', bottom: '50px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
    return { name: pdfName, path: `tmp/${pdfName}`, email: pdfData.email };
  }

  static async createPdfFromTemplate(
    templatePath: any,
    pdfData: any,
    pdfName: string,
  ): Promise<IFile> {
    const source = await FileManipulation.openFileSync(templatePath);
    if (source === undefined) throw new Error('Could not load template pdf');

    const template = Handlebars.compile(source.toString());

    const headerPartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/header.hbs',
    );

    if (headerPartial) {
      Handlebars.registerPartial('header', headerPartial.toString());
    }

    const tableHeaderPartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/table-header.hbs',
    );

    if (tableHeaderPartial) {
      Handlebars.registerPartial('tableHeader', tableHeaderPartial.toString());
    }

    const gradeReportCoursePartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/grade-report-course.hbs',
    );

    if (gradeReportCoursePartial) {
      Handlebars.registerPartial(
        'gradeReportCourse',
        gradeReportCoursePartial.toString(),
      );
    }

    const gradeReportProjectPartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/grade-report-project.hbs',
    );

    if (gradeReportProjectPartial) {
      Handlebars.registerPartial(
        'gradeReportProject',
        gradeReportProjectPartial.toString(),
      );
    }

    const officialTranscriptCoursePartial = await FileManipulation.openFileSync(
      './src/infrastructure/reportsTemplates/views/partials/official-transcript-course.hbs',
    );

    if (officialTranscriptCoursePartial) {
      Handlebars.registerPartial(
        'officialTranscriptCourse',
        officialTranscriptCoursePartial.toString(),
      );
    }
    const officialTranscriptProjectPartial =
      await FileManipulation.openFileSync(
        './src/infrastructure/reportsTemplates/views/partials/official-transcript-project.hbs',
      );

    if (officialTranscriptProjectPartial) {
      Handlebars.registerPartial(
        'officialTranscriptProject',
        officialTranscriptProjectPartial.toString(),
      );
    }
    Handlebars.registerHelper(
      'ifEquals',
      function ifEquals(this: any, arg1: string, arg2: string, options: any) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
      },
    );

    Handlebars.registerHelper(
      'ifEven',
      function ifEven(this: any, arg1: number, options: any) {
        return arg1 % 2 === 0 ? options.fn(this) : options.inverse(this);
      },
    );

    Handlebars.registerHelper(
      'toFixed',
      function toFixed(this: any, arg1: number, arg2: number | string) {
        if (arg2 === null) return null;
        if (arg2 === undefined) return null;
        if (typeof arg2 === 'string') return parseInt(arg2, 10).toFixed(arg1);
        return arg2.toFixed(arg1);
      },
    );

    const result = template(pdfData);
    console.log(`linha 102 ${process.env.CHROMIUM_PATH}`);

    const browser = await puppeteer.launch({
      executablePath: process.env.CHROMIUM_PATH,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(result, { waitUntil: 'load' });
    await page.emulateMediaType('screen');
    await page.pdf({
      path: `tmp/${pdfName}`,
      margin: { top: '50px', right: '50px', bottom: '50px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
    await browser.close();
    return { name: pdfName, path: `tmp/${pdfName}` };
  }
}

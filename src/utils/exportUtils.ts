import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';

// PDF Export Function
export const exportToPDF = async (elementId: string, filename: string = 'MHC701_Textbook.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF export');
    return;
  }

  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait' as const,
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as const }
  };

  try {
    await html2pdf().set(opt as any).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Helper function to convert markdown-like content to DOCX paragraphs
const parseContentToDocX = (content: string): Paragraph[] => {
  const paragraphs: Paragraph[] = [];
  const lines = content.split('\n');
  
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  const processInlineFormatting = (text: string): TextRun[] => {
    const runs: TextRun[] = [];
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    parts.forEach(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        runs.push(new TextRun({
          text: part.slice(2, -2),
          bold: true,
          size: 24
        }));
      } else if (part) {
        runs.push(new TextRun({
          text: part,
          size: 24
        }));
      }
    });
    
    return runs;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table handling
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
        tableRows = [];
      } else if (cells.every(c => c.match(/^[-:]+$/))) {
        continue;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      // Create table
      const table = new Table({
        rows: [
          new TableRow({
            children: tableHeaders.map(header => 
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: header, bold: true, size: 22 })],
                  spacing: { before: 100, after: 100 }
                })],
                width: { size: 100 / tableHeaders.length, type: WidthType.PERCENTAGE },
                shading: { fill: 'E7F3FF' }
              })
            )
          }),
          ...tableRows.map(row => 
            new TableRow({
              children: row.map(cell => 
                new TableCell({
                  children: [new Paragraph({
                    children: processInlineFormatting(cell),
                    spacing: { before: 50, after: 50 }
                  })],
                  width: { size: 100 / row.length, type: WidthType.PERCENTAGE }
                })
              )
            })
          )
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
      });
      
      paragraphs.push(new Paragraph({ children: [] }));
      // Note: Tables need to be added differently in docx library
      // For simplicity, we'll convert tables to formatted text
      tableHeaders.forEach(header => {
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: `${header}: `, bold: true, size: 24 })],
          spacing: { before: 100 }
        }));
      });
      tableRows.forEach(row => {
        row.forEach((cell, idx) => {
          if (tableHeaders[idx]) {
            paragraphs.push(new Paragraph({
              children: [
                new TextRun({ text: `${tableHeaders[idx]}: `, bold: true, size: 22 }),
                ...processInlineFormatting(cell)
              ],
              spacing: { before: 50 }
            }));
          }
        });
      });
      
      inTable = false;
      tableRows = [];
      tableHeaders = [];
    }

    // Headers
    if (line.startsWith('### ')) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.slice(4), bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 300, after: 150 }
      }));
    } else if (line.startsWith('## ')) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.slice(3), bold: true, size: 32 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      }));
    } else if (line.startsWith('# ')) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.slice(2), bold: true, size: 36 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 500, after: 250 }
      }));
    }
    // Horizontal rule
    else if (line.startsWith('---')) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: '─'.repeat(80), color: 'CCCCCC', size: 20 })],
        spacing: { before: 200, after: 200 }
      }));
    }
    // List items
    else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const content = line.trim().slice(2);
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: '• ', size: 24 }),
          ...processInlineFormatting(content)
        ],
        indent: { left: 720 },
        spacing: { before: 50, after: 50 }
      }));
    }
    // Numbered list
    else if (line.trim().match(/^\d+\.\s/)) {
      const match = line.trim().match(/^(\d+)\.\s(.*)$/);
      if (match) {
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `${match[1]}. `, size: 24 }),
            ...processInlineFormatting(match[2])
          ],
          indent: { left: 720 },
          spacing: { before: 50, after: 50 }
        }));
      }
    }
    // Empty line
    else if (line.trim() === '') {
      paragraphs.push(new Paragraph({ children: [] }));
    }
    // Regular paragraph
    else {
      paragraphs.push(new Paragraph({
        children: processInlineFormatting(line),
        spacing: { before: 100, after: 100 }
      }));
    }
  }

  return paragraphs;
};

// DOCX Export Function
export const exportToDOCX = async (content: string, filename: string = 'MHC701_Textbook.docx') => {
  try {
    const doc = new Document({
      creator: 'Triune Biblical University Global Extension',
      title: 'MHC. 701 Fundamentals of Mental Health Counseling',
      description: 'Comprehensive textbook for Master\'s program in Mental Health Counseling',
      styles: {
        default: {
          heading1: {
            run: {
              size: 36,
              bold: true,
              color: '1E3A5F',
            },
            paragraph: {
              spacing: { before: 500, after: 250 },
            },
          },
          heading2: {
            run: {
              size: 32,
              bold: true,
              color: '1E40AF',
            },
            paragraph: {
              spacing: { before: 400, after: 200 },
            },
          },
          heading3: {
            run: {
              size: 28,
              bold: true,
              color: '1E40AF',
            },
            paragraph: {
              spacing: { before: 300, after: 150 },
            },
          },
        },
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: parseContentToDocX(content),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw error;
  }
};

// Export current chapter
export const exportCurrentChapter = async (
  chapterTitle: string,
  content: string,
  format: 'pdf' | 'docx'
) => {
  const sanitizedTitle = chapterTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  
  if (format === 'pdf') {
    // For PDF, we need to render the content to a temporary element
    const tempDiv = document.createElement('div');
    tempDiv.id = 'temp-export-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Georgia, serif';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #1E3A5F; font-size: 28px; margin-bottom: 10px;">MHC. 701</h1>
        <h2 style="color: #1E40AF; font-size: 24px; margin-bottom: 5px;">${chapterTitle}</h2>
        <p style="color: #666; font-size: 14px;">Triune Biblical University Global Extension</p>
      </div>
      <div style="font-size: 12pt;">${content}</div>
    `;
    document.body.appendChild(tempDiv);
    
    await exportToPDF('temp-export-content', `MHC701_${sanitizedTitle}.pdf`);
    document.body.removeChild(tempDiv);
  } else {
    const fullContent = `# MHC. 701 Fundamentals of Mental Health Counseling\n\n## ${chapterTitle}\n\n**Triune Biblical University Global Extension**\n\n---\n\n${content}`;
    await exportToDOCX(fullContent, `MHC701_${sanitizedTitle}.docx`);
  }
};

// Export entire textbook
export const exportEntireTextbook = async (
  allContent: Record<number, string>,
  chapters: Array<{ id: number; title: string; subtitle: string }>,
  format: 'pdf' | 'docx'
) => {
  if (format === 'pdf') {
    const tempDiv = document.createElement('div');
    tempDiv.id = 'temp-full-textbook';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Georgia, serif';
    tempDiv.style.lineHeight = '1.6';
    
    let htmlContent = `
      <div style="text-align: center; margin-bottom: 60px; page-break-after: always;">
        <h1 style="color: #1E3A5F; font-size: 36px; margin-bottom: 20px;">MHC. 701</h1>
        <h2 style="color: #1E40AF; font-size: 28px; margin-bottom: 10px;">Fundamentals of Mental Health Counseling</h2>
        <p style="color: #666; font-size: 16px; margin-top: 40px;">Triune Biblical University Global Extension</p>
        <p style="color: #666; font-size: 14px;">Master's Degree Program in Mental Health Counseling</p>
      </div>
    `;
    
    chapters.forEach(chapter => {
      const content = allContent[chapter.id] || '';
      htmlContent += `
        <div style="page-break-before: always;">
          <h1 style="color: #1E3A5F; font-size: 28px; margin-bottom: 10px;">Chapter ${chapter.id}: ${chapter.title}</h1>
          <h2 style="color: #1E40AF; font-size: 20px; margin-bottom: 30px; font-style: italic;">${chapter.subtitle}</h2>
          <div style="font-size: 12pt;">${content}</div>
        </div>
      `;
    });
    
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);
    
    await exportToPDF('temp-full-textbook', 'MHC701_Complete_Textbook.pdf');
    document.body.removeChild(tempDiv);
  } else {
    let fullContent = `# MHC. 701 Fundamentals of Mental Health Counseling\n\n`;
    fullContent += `**Triune Biblical University Global Extension**\n`;
    fullContent += `**Master's Degree Program in Mental Health Counseling**\n\n---\n\n`;
    
    chapters.forEach(chapter => {
      const content = allContent[chapter.id] || '';
      fullContent += `\n# Chapter ${chapter.id}: ${chapter.title}\n\n`;
      fullContent += `## ${chapter.subtitle}\n\n`;
      fullContent += `---\n\n${content}\n\n`;
    });
    
    await exportToDOCX(fullContent, 'MHC701_Complete_Textbook.docx');
  }
};

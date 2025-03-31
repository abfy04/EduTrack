import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export const exportScheduleAsPdf = ({ schedule, days, sessions, teacherName }) => {
  try {
    // Create new PDF document in landscape orientation with half A4 size
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [148, 210] // Half of A4 (297 x 210)
    });

    // Add title with smaller font
    doc.setFontSize(14);
    doc.text(`Schedule - ${teacherName}`, 10, 10);
    
    // Add subtitle with date
    doc.setFontSize(8);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 10, 15);

    // Create headers array with time slots
    const headers = ['Days', ...sessions.map(session => `${session.start} - ${session.end}`)];

    // Create body data
    const bodyData = days.map(day => {
      const rowData = [day];
      sessions.forEach(session => {
        const matchingSession = schedule.find(s => 
          s.day_of_week === day && 
          s.start_time === session.start
        );

        if (matchingSession) {
          rowData.push({
            content: `${matchingSession.group_name}\n${matchingSession.room_name}`,
            styles: {
              fillColor:  [240, 240, 255],
              textColor: [100, 50, 200],
              fontStyle: 'bold',
              halign: 'center',
              valign: 'middle'
            }
          });
        } else {
          rowData.push('');
        }
      });
      return rowData;
    });

    // Generate the table with smaller dimensions
    autoTable(doc, {
      head: [headers],
      body: bodyData,
      startY: 20,
      styles: {
        fontSize: 7,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
        minCellHeight: 7
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [50, 50, 50],
        fontSize: 7,
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle',
        cellPadding: 2
      },
      columnStyles: {
        0: { // Days column
          fillColor: [240, 240, 240],
          textColor: [50, 50, 50],
          fontStyle: 'bold',
          halign: 'left',
          cellWidth: 20
        },
        1: { cellWidth: 30 }, // First time slot
        2: { cellWidth: 30 }, // Second time slot
        3: { cellWidth: 30 }, // Third time slot
        4: { cellWidth: 30 }, // Fourth time slot
        5: { cellWidth: 30 }  // Fifth time slot
      },
      didParseCell: function(data) {
        // Center align all cells except the first column (days)
        if (data.column.index !== 0) {
          data.cell.styles.halign = 'center';
        }
      },
      willDrawCell: function(data) {
        // Add custom styling for cells with content
        if (data.row.section === 'body' && data.column.index > 0) {
          const cell = data.cell;
          if (cell.text && cell.text.length > 0) {
            if (!cell.styles.fillColor) {
              cell.styles.fillColor = [240, 240, 255];
            }
            if (!cell.styles.textColor) {
              cell.styles.textColor = [100, 50, 200];
            }
          }
        }
      },
      margin: { top: 20, left: 10, right: 10 }
    });

    // Add footer with smaller font
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(6);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 5,
        { align: 'center' }
      );
    }

    // Save the PDF
    doc.save(`schedule-${teacherName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);

    return true;
  } catch (error) {
    console.error('Error exporting schedule to PDF:', error);
    return false;
  }
}; 
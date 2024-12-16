import {
  CellFooterWidget,
} from './widget';

import { 
  NotebookPanel 
} from '@jupyterlab/notebook';

import { 
  CodeCell,
  Cell, 
  MarkdownCell,
  RawCell
} from '@jupyterlab/cells';

import { 
  PanelLayout,
  Widget
} from '@lumino/widgets';


function addFooter(cell: Cell) { 
  let layout = (cell.layout as PanelLayout);
  // Appends the diff element after 
  // the node in the DOM with this class. 
  // NOTE: is there a better way to do this?
  let predecessorClass = "jp-Cell-inputWrapper"
  let predecessorIndex = layout.widgets.findIndex((widget: Widget, index: number, obj: readonly Widget[]) => {
    return widget.hasClass(predecessorClass);
  })

  if (predecessorIndex == -1) {
    console.error("Could not find the correct element.");
    return;
  }

  // Insert Widget right after
  let footer = new CellFooterWidget()
  layout.insertWidget(predecessorIndex + 1, footer);
  footer.hide();
}

/**
 * Extend the default implementation of an `IContentFactory`.
 */
export class ContentFactoryWithFooter extends NotebookPanel.ContentFactory {
  /**
   * Create a new cell header for the parent widget.
   */

  createCodeCell(options: CodeCell.IOptions): CodeCell {
    let codeCell = super.createCodeCell(options);

    codeCell.ready.then(() => { 
      addFooter(codeCell);
    })
    return codeCell;
  }

  createMarkdownCell(options: MarkdownCell.IOptions): MarkdownCell {
    let markdownCell = super.createMarkdownCell(options);

    markdownCell.ready.then(() => { 
      addFooter(markdownCell);
    })
    return markdownCell;
  }

  createRawCell(options: RawCell.IOptions): RawCell {
    let rawCell = super.createRawCell(options);

    rawCell.ready.then(() => { 
      addFooter(rawCell);
    })
    return rawCell;
  }
}

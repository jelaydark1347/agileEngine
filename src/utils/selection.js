export const hasSelection = () => {
  const selection = window.getSelection()
  const { isCollapsed } = selection
  return isCollapsed
}

export const modifySelection = (selectionObject) => {
  const { anchorOffset, focusOffset } = selectionObject
  const selectionFromRight = (anchorOffset - focusOffset) > 0
  selectionObject.modify('move', selectionFromRight ? 'right' : 'left', 'word') // return to the start of the word
  selectionObject.modify('extend', selectionFromRight ? 'left' : 'right', 'word') // select word
  const textTrash = selectionObject.toString().match(/\W/g) // all nonWord Symbols
  if (textTrash) {
    const count = textTrash.length
    const { anchorOffset, anchorNode, focusOffset, focusNode } = selectionObject // get new data of selection
    if (selectionFromRight) { // deselect excess elements
      const newOffset = anchorOffset - count
      selectionObject.setBaseAndExtent(anchorNode, newOffset, focusNode, focusOffset)
    } else {
      selectionObject.extend(focusNode, focusOffset - 1)
    }
  }
}

export const cutDownSelection = (selectionObj) => {
  const { focusNode, focusOffset } = selectionObj
  selectionObj.setPosition(focusNode, focusOffset)
}

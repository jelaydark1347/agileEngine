// here we can generate new modifiers (for ex, instead of execCommand use inserNode, wrote by ourselves)
import { UNDERLINE, ITALIC, BOLD } from '../constants/buttons'

const makeBold = () => document.execCommand('bold')
const makeItalic = () => document.execCommand('italic')
const makeUnderline = () => document.execCommand('underline')

const modifiers = {
  [BOLD]: makeBold,
  [ITALIC]: makeItalic,
  [UNDERLINE]: makeUnderline,
}

export default modifiers

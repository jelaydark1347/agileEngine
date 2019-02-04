
  
# Simple text editor ![Simple Text Editor](https://i.ibb.co/mzmztSY/te.png)  
  
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).    
    
## Initial setup Run `npm install` in order to setup application    
    
## Development server Run `npm start` for a dev server.    
    
## Opportunities  
  
 - You can select words using mouse (without DblClick in the newest browsers), rather than using combination Shift + Arrows.  
 - You can not modify more than one word in one time  
 - You can write only simple words without modificators (beforehand write, then select and modify :) )  
  
## Usage

    <Editor
	    checkModState={(type) => document.queryCommandState(type)}
	    defaultText={text}    
	    getSynonyms={getSynonyms}  
	    modifiers={defaultModifiers} 
	    modOnlySelection={true}   
	    selectSolidWord={true}  
	    showSynonyms={true}  
    />
  
  

 
| prop's name| default | description |
|--|--|--|
| selectSolidWord  | true | if set to true u have no opportunity to select more and less than one word |
| onSelect| undefined| function, performs whenever text is selected |
| showSynonyms| false| if set to true, shows synonyms to a word (`if set to true getSynonyms is Required`) |
| defaultText| undefined| predefined string of the text |
| checkModState| `(type) => document.queryCommandState(type)`| function to check is modifier turned on by it's type |
| getSynonyms| undefined | method, that returns array of synonyms |
| modOnlySelection| true| is set to true, you can not use modifiers buttons out of selection|
| modifiers| []| array of buttons. Must have special keys (`look as ButtonProps`)|

### Button Props:
    {
     type: {Uniq key},
     sign: {btn's value},
     btnStyle: {uniq style of the btn, if u want to},
     method: {onClick function for btn}
     }


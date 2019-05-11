function _createNode(element){
    return document.createElement(element)
}

function _append(parent, el){
    return parent.appendChild(el)
}

function _toggleItself(btn, content){    
    btn && btn.addEventListener('click', ()=>{
      
      if(content.hasAttribute('hidden')){
        content.removeAttribute('hidden')
      }
      else{
        content.setAttribute('hidden', '')
      }
    })    
}

export {
    _createNode, _append, _toggleItself
}
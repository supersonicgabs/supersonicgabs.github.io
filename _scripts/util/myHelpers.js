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
        btn.classList.add('active')
      }
      else{
        content.setAttribute('hidden', '')
        btn.classList.remove('active')
      }
    })    
}

export {
    _createNode, _append, _toggleItself
}
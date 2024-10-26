import { TextSelection } from '@tiptap/pm/state'
import { useCurrentEditor } from '@tiptap/react'

export const ToCItem = ({ item, onItemClick }: any) => {
  return (
    <div className={`${item.isActive && !item.isScrolledOver ? 'is-active' : ''} ${item.isScrolledOver ? 'is-scrolled-over' : ''}`} style={{
      '--level': item.level,
    } as React.CSSProperties}>
      <a href={`#${item.id}`} onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>{item.textContent}</a>
    </div>
  )
}

export const ToCEmptyState = () => {
  return (
    <div className="empty-state">
      <p>Start editing your document to see the outline.</p>
    </div>
  )
}

export const ToC = ({
  items = [],

}: any) => {

  const {editor} = useCurrentEditor()

  if (!editor) {
    return null
  }

  if (items.length === 0) {
    return <ToCEmptyState />
  }

  const onItemClick = (e: any, id: any) => {
    e.preventDefault()

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`)
      if (!element) {
        console.log('Element not found')
        return
      }
      const pos = editor.view.posAtDOM(element, 0)

      // set focus
      const tr = editor.view.state.tr

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)))

      editor.view.dispatch(tr)

      editor.view.focus()

      if (history.pushState) { // eslint-disable-line
        history.pushState(null, '', `#${id}`) // eslint-disable-line
      }

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {items.map((item: any, i: any) => (
        <ToCItem onItemClick={onItemClick} key={item.id} item={item} index={i + 1} />
      ))}
    </>
  )
}


const TableOfContent = ({title, list}: {title: string; list: any[]}) => {

  return (
    <>
      {list.length > 0 && (
        <aside className="toc">
          <nav role="navigation">
            <h2 className="type-headline-m type-bold u-mb--space-2 toc__title">{title}</h2>
            <ul className="toc__list">

            </ul>
          </nav>
        </aside>
      )}
    </>
  )
}

export default TableOfContent;

import "./Pagination.css";

const Pagination = ({ page, totalPages, onPageChange, groupSize = 10 }) => {
  if (!Number.isFinite(page) || !Number.isFinite(totalPages) || totalPages <= 0) {
    return null; // 방어코드
  }
  const currentGroup = Math.floor(page / groupSize);
  const startPage = currentGroup * groupSize;
  const endPage = Math.min(startPage + groupSize - 1, totalPages -1);

  return(
    <div className="Pagination">
      <button
        onClick={() => onPageChange(0)}
        disabled={startPage === 0}>&laquo;
      </button>
      <button
        onClick={() => onPageChange(Math.max(0, page-1))}
        disabled={page === 0}>&lt;
      </button>
      {/* 페이지 번호 */}
      {(() => {
        const buttons = [];
        for (let p = startPage; p <= endPage; p++) {
          buttons.push(
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={p === page ? "active" : ""}
            >
              {p + 1}
            </button>
          );
        }
        return buttons;
      })()}
      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}>&gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={endPage >= totalPages - 1}>&raquo;
      </button>
    </div>
  )

}

export default Pagination;
import "./Pagination.css";

const Pagination = ({ page, totalPages, onPageChange, groupSize = 10 }) => {
  // 숫자가 아니거나 총 페이지가 0이하이면 렌더링하지 않음
  if (!Number.isFinite(page) || !Number.isFinite(totalPages) || totalPages <= 0) {
    return null; // 방어코드
  }
  const currentGroup = Math.floor(page / groupSize);
  const startPage = currentGroup * groupSize;                           // 이 그룹의 시작 인덱스
  const endPage = Math.min(startPage + groupSize - 1, totalPages -1);   // 이 그룹의 끝 인덱스

  return(
    <div className="Pagination" aria-label="페이지네이션">
      <button
        type="button"
        aria-label="이전 페이지 묶음"
        onClick={() => onPageChange(Math.max(0, startPage - groupSize))}
        disabled={startPage === 0}>&laquo;
      </button>
      <button
        type="button"
        aria-label="이전 페이지"
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
        type="button"
        aria-label="다음 페이지"
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}>&gt;
      </button>
      <button
        type="button"
        aria-label="다음 페이지 묶음"
        onClick={() => onPageChange(Math.min(totalPages - 1, startPage + groupSize))}
        disabled={endPage >= totalPages - 1}>&raquo;
      </button>
    </div>
  )

}

export default Pagination;
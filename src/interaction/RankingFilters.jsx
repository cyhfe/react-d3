function RankingFilters({ filters, setActiveFilter, activeFilter }) {
  return (
    <div>
      {filters.map((f) => {
        return (
          <button
            key={f.id}
            onClick={() => activeFilter !== f.id && setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}

export default RankingFilters

// A responsive table component that converts to cards on mobile
const ResponsiveTable = ({
  columns,
  data,
  renderRow,
  renderMobileCard,
  className = "",
}) => {
  return (
    <div className="w-full">
      {/* Desktop table view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className={`w-full table-auto ${className}`}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => renderRow(item, rowIndex))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden space-y-4">
        {data.map((item, index) => renderMobileCard(item, index))}
      </div>
    </div>
  );
};

export default ResponsiveTable;

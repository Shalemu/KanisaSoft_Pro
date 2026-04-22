'use client';

import { FaEdit } from 'react-icons/fa';

export default function ViongoziTable({
  leaders,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  onEdit,
  onRowClick,
}: any) {

  return (
    <div className="overflow-x-auto bg-white border rounded">

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th>
              <input type="checkbox" onChange={toggleSelectAll} />
            </th>
            <th>Jina</th>
            <th>Simu</th>
            <th>Nafasi</th>
            <th>Hatua</th>
          </tr>
        </thead>

        <tbody>
          {leaders.map((row: any) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => row.user_id && onRowClick(row.user_id)}
            >
              <td onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => toggleSelect(row.id)}
                />
              </td>

              <td>
                <div>{row.name}</div>
                <div className="text-xs text-gray-500">{row.email}</div>
              </td>

              <td>{row.phone}</td>

              <td>
                <div className="flex flex-wrap gap-1">
                  {row.roles?.length ? (
                    row.roles.map((r: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                      >
                        {r}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">Hakuna</span>
                  )}
                </div>
              </td>

              <td onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onEdit(row.id)}
                  className="text-yellow-600"
                >
                  <FaEdit />
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
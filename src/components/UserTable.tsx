import React, { useState } from 'react';
import CountryTag from './CountryTag';

interface User {
  id: string;
  userName: string;
  userCode: string;
  countries: string[];
}

interface UsersTableProps {
  users: User[];
  onEdit?: (userId: string) => void;
  onView?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onView, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleEdit = (userId: string) => {
    onEdit?.(userId);
    setOpenMenuId(null);
  };

  const handleView = (userId: string) => {
    onView?.(userId);
    setOpenMenuId(null);
  };

  const handleDelete = (userId: string) => {
    onDelete?.(userId)
    setOpenMenuId(null)
  }

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#CAD2D8]">
            <th className="text-left py-3 px-6 text-sm font-normal text-[#566676] capitalize">
              <div className="flex items-center gap-1">
                User Name
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down text-[#566676]"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
              </div>
            </th>
            <th className="text-left py-3 px-6 text-sm font-normal text-[#566676] capitalize">
              <div className="flex items-center gap-1">
                User Code
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down text-[#566676]"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
              </div>
            </th>
            <th className="text-left py-3 px-6 text-sm font-normal text-[#566676] capitalize">
              <div className="flex items-center gap-1">
                Countries
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down text-[#566676]"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
              </div>
            </th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-[#E5E9EB]">
              <td className="py-4 px-6 text-sm text-[#15191E]">{user.userName}</td>
              <td className="py-4 px-6 text-sm text-[#15191E]">{user.userCode}</td>
              <td className="py-4 px-6">
                <div className="flex flex-wrap gap-2">
                  {user.countries.slice(0, 5).map((country, idx) => (
                    <CountryTag country={country} key={idx}/>
                  ))}
                  {user.countries.length > 5 && (
                    <span className="px-2.5 py-1 bg-white text-[#15191E] text-xs rounded border border-[#CAD2D8]">
                      +{user.countries.length - 5} More
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 px-6 relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#566676]">
                    <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
                
                {openMenuId === user.id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenMenuId(null)}
                    ></div>
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-[#CAD2D8] py-1 z-20">
                      <button
                        onClick={() => handleView(user.id)}
                        className="w-full px-4 py-2 text-left text-sm cursor-pointer text-[#15191E] hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="w-full px-4 py-2 text-left text-sm cursor-pointer text-[#15191E] hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-full px-4 py-2 text-left text-sm cursor-pointer text-red-400 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;